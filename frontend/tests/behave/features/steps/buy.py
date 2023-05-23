from behave import when, then

@when('the user enters the route: "{route}"')
def step_impl(context, route):
    print(f"🌎 Go to {route}")
    context.browser.get(context.home + route)
    context.wait()


@when('click in button with text: "{button}"')
def step_button_click(context, button):
    print(f"💻 Clicking in {button}")
    context.browser.find_element(context.By.XPATH, f"//button[text()='{button}']").click()


@when('seletc "{token}" Token')
def step_token_selction(context, token):
    print(f"🪙 Selecting token {token}")
    context.wait()
    context.browser.find_element(context.By.ID, 'choiceToken').click()
    context.wait()
    context.browser.find_element(context.By.ID, token).click()


@when('input "{value}" of value')
def step_input_amount(context, value):
    print("💵 Put {value} tokens")
    context.browser.find_element(context.By.ID, "value").send_keys(value)


@when("confirm purchase")
def step_confirm_purchase(context):
    print("💰 Confirm purchase")
    context.browser.find_element(context.By.ID, "confirm").click()

    context.wait()
    for tab in context.browser.window_handles:
        if tab != context.metamask_tab and tab != context.page_tab:
            context.browser.switch_to.window(tab)

    print("🤝 Given approve")
    context.browser.find_element(context.By.XPATH,"//button[text()='Confirmar']").click()
    context.wait()
    context.browser.switch_to.window(context.page_tab)

    context.wait()
    for tab in context.browser.window_handles:
        if tab != context.metamask_tab and tab != context.page_tab:
            context.browser.switch_to.window(tab)

    print("📑 Confirm buy contract")
    context.browser.find_element(context.By.XPATH,"//button[text()='Confirmar']").click()
    context.wait()
    context.browser.switch_to.window(context.page_tab)

@then('user should have a contrato with "{_kg}" kg')
def step_get_contratos(context, _kg):
    context.browser.get(context.home + "/drawer")
    context.wait()
    context.wait()
    contract = context.browser.find_element(context.By.ID, "kg")
    kg_rouded = round(float(contract.text.split()[0]), 2)
    assert kg_rouded == float(_kg)
