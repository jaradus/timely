class UserMailer < ActionMailer::Base
  default from: "from@example.com"

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.greetings.subject
  #   ExampleMailer.example_message().deliver
  #   UserMailer.greetings(current_user).deliver
  def greetings(user)

    @user = user
    @url  = 'http://cherry-timely.herokuapp.com'
    mail(to: @user.email, subject: 'Welcome to Mailing App Demo!!!!')
  end
end
