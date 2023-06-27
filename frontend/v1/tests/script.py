from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver import Chrome, Firefox
from time import sleep


print("🏁 Start settings...")
recovery_phrase = "test test test test test test test test test test test junk"
metamask_id = "nkbihfbeogaeaoehlefnkodbefgpgknn"
home = "http://localhost:3000"
wait = lambda: sleep(5)
pwd = 12345678

# opts = Options()
# opts.add_extension("metamask-extension.crx")
# _1_minute = 60_000
# opts.add_experimental_option('extensionLoadTimeout', _1_minute)

print("🔧 Creating the browser...", end=" ")
browser = Firefox()
# browser.create_options()
print("Browser created ✅")

print("🎁 Adding metamask extension...")
browser.install_addon("./metamask-firefox.xpi", temporary=True)
wait()

print("🔁 Switch to metamask window")
metamask_tab = browser.window_handles[1]
page_tab = browser.window_handles[0]
browser.switch_to.window(metamask_tab)

print("🔨 Setup metamask...")
wait()
browser.find_element(By.XPATH,"//button[text()='Comece agora']").click()
browser.find_element(By.XPATH,"//button[text()='Concordo']").click()
browser.find_element(By.XPATH,"//button[text()='Importar carteira']").click()
inputs = browser.find_elements(By.XPATH, "//input")

print(f"🔑 Add seed phrase: {recovery_phrase}")
for i in range(0, 24, 2):
    inputs[i].send_keys(recovery_phrase.split(" ")[int(i / 2)])

print(f"🔐 Add password: {pwd}")
inputs[24].send_keys(pwd)
inputs[25].send_keys(pwd)
inputs[26].click()

browser.find_element(By.XPATH,"//button[text()='Importar']").click()
wait()
browser.find_element(By.XPATH,"//button[text()='Tudo pronto']").click()

print("📡 Change Network")
firefox_metamask_url = browser.current_url + "settings/networks"
wait()
browser.get(firefox_metamask_url)
browser.find_elements(By.TAG_NAME, 'div')[71].click()
inputs = browser.find_elements(By.XPATH, "//input")
inputs[4].clear()
inputs[4].send_keys(3133)
inputs[4].send_keys(7)
wait()
browser.find_elements(By.XPATH, "//button")[12].click()
print("✅ Done for test!")


print("🌎 go to home")
browser.switch_to.window(page_tab)
browser.get(home)

print("💻 click in `connect wallet` button")
browser.find_element(By.ID, "connectWallet").click()
wait()

print("🔁 switch to window of metamask sign in")
for tab in browser.window_handles:
    if tab != metamask_tab and tab != page_tab:
        browser.switch_to.window(tab)
        wait()

print("🔐 connect wallet on home page")
browser.find_element(By.XPATH,"//button[text()='Seguinte']").click()
browser.find_element(By.XPATH,"//button[text()='Conectar']").click()

print("🔁 come back to window of home page")
browser.switch_to.window(page_tab)
wait()

print("✅ validate `address` in button")
element = browser.find_elements(By.TAG_NAME, "button")[1]
assert element.text != "Connect Wallet"
assert element.text == "0xf39...2266"



print("🌎 go to buy")
browser.get(home + "/buy")
wait()

print("🪙 Selecting token USDC")
browser.find_element(By.ID, 'choiceToken').click()
wait()
browser.find_element(By.ID, 'USDC').click()

print("💵 put 122 USDC")
browser.find_element(By.ID, "value").send_keys(122)

print("💰 confirm purchase")
browser.find_element(By.ID, "confirm").click()

wait()
for tab in browser.window_handles:
    if tab != metamask_tab and tab != page_tab:
        browser.switch_to.window(tab)

print("🤝 Given approve")
browser.find_element(By.XPATH,"//button[text()='Confirmar']").click()
wait()
browser.switch_to.window(page_tab)

wait()
for tab in browser.window_handles:
    if tab != metamask_tab and tab != page_tab:
        browser.switch_to.window(tab)

print("📑 confirm buy contract")
browser.find_element(By.XPATH,"//button[text()='Confirmar']").click()
wait()
browser.switch_to.window(page_tab)

print("🌎 go to drawer")
browser.get(home + "/drawer")
wait()

contract = browser.find_element(By.ID, "kg")
print(contract.text)
