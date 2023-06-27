from behave import given

@given('user is logged in')
def step_login(context):
    print("🌎 go to home")
    context.browser.get(context.home)
    context.wait()

    print("💻 click in `connect wallet` button")
    context.browser.find_element(context.By.ID, "connectWallet").click()
    context.wait()

    print("🔁 switch to window of metamask sign in")
    for tab in context.browser.window_handles:
        if tab != context.metamask_tab and tab != context.page_tab:
            context.browser.switch_to.window(tab)
            context.wait()

    print("🔐 connect wallet on home page")
    context.browser.find_element(context.By.XPATH,"//button[text()='Seguinte']").click()
    context.browser.find_element(context.By.XPATH,"//button[text()='Conectar']").click()

    print("🔁 come back to window of home page")
    context.browser.switch_to.window(context.page_tab)
    context.wait()

    print("✅ validate `address` in button")
    context.element = context.browser.find_elements(context.By.TAG_NAME, "button")[1]
    assert context.element.text != "Connect Wallet"
    assert context.element.text == "0xf39...2266"
