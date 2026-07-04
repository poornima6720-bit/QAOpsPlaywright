Feature: Ecommerce Validations
  @Validation
  Scenario Outline: Placing the Order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed

  Examples:
      | username                | password   | 
      | poornima6723@gmail.com  | Nethra10!  | 
      | hello@123.com           | Iamhell0   |  