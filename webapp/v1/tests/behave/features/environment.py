from selenium.webdriver.chrome.options import Options as ChromeOptions
from selenium.webdriver.common.by import By
from selenium.webdriver import Firefox
from time import sleep




def before_feature(context, feature):
    print(f"🏁 Start settings for {feature}...")
    context.recovery_phrase = "test test test test test test test test test test test junk"
    context.home = "http://localhost:3000"
    context.wait = lambda: sleep(5)
    context.pwd = 12345678
    context.By = By


    print("🔧 Creating the browser...")
    context.wait()
    context.browser = Firefox()
    print("🔷 Browser created")

    print("🎁 Adding metamask extension...")
    context.browser.install_addon("./metamask-firefox.xpi", temporary=True)
    context.wait()

    print("🔁 Switch to metamask window")
    context.metamask_tab = context.browser.window_handles[1]
    context.page_tab = context.browser.window_handles[0]
    context.browser.switch_to.window(context.metamask_tab)

    print("🔨 Setup metamask...")
    context.wait()
    context.browser.find_element(By.XPATH,"//button[text()='Comece agora']").click()
    context.browser.find_element(By.XPATH,"//button[text()='Concordo']").click()
    context.browser.find_element(By.XPATH,"//button[text()='Importar carteira']").click()

    inputs = context.browser.find_elements(By.XPATH, "//input")

    print(f"🔑 Add seed phrase: {context.recovery_phrase}")
    for i in range(0, 24, 2):
        inputs[i].send_keys(context.recovery_phrase.split(" ")[int(i / 2)])

    print(f"🔐 Add password: {context.pwd}")
    inputs[24].send_keys(context.pwd)
    inputs[25].send_keys(context.pwd)
    inputs[26].click()

    context.browser.find_element(By.XPATH,"//button[text()='Importar']").click()
    context.wait()
    context.wait()
    context.browser.find_element(By.XPATH,"//button[text()='Tudo pronto']").click()

    print("📡 Change Network")
    context.browser.get(context.browser.current_url + "settings/networks")
    context.browser.find_elements(By.TAG_NAME, 'div')[71].click()
    inputs = context.browser.find_elements(By.XPATH, "//input")
    inputs[4].clear()
    inputs[4].send_keys(3133)
    inputs[4].send_keys(7)
    context.browser.find_elements(By.XPATH, "//button")[12].click()

    print("🔁 Switch to first window")
    context.browser.switch_to.window(context.page_tab)
    print("✅ Done for test!")

def after_feature(context, feature):
    print("🚨 Shutting down browser")
    context.wait()
    context.browser.quit()
    print(f"✅ Test {feature} finished!")
