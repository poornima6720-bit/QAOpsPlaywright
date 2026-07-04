Feature: Ecommerce Validations

    @Regression
    Scenario: Placing the Order
        Given a login to Ecommerce application with "poornima6723@gmail.com" and "Nethra10!"
        When Add "ZARA COAT 3" to cart
        Then "ZARA COAT 3" is displayed in the Cart
        When Enter valid details like Country "India" and Place the Order
        Then " Thankyou for the order. " message should be displayed
        And Verify order is present in the OrderHistory

    @Validation
    Scenario Outline: Placing the Order
        Given a login to Ecommerce2 application with "<username>" and "<password>"
        Then Verify Error message is displayed

        Examples:
            | username               | password  |
            | poornima6723@gmail.com | Nethra10! |
            | hello@123.com          | Iamhell0  |