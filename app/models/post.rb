class Post < ApplicationRecord
  before_save   :add_factorial

  def add_factorial

    def random_factorial
      number = rand(1..10)
      def factorial(number_argument)
        if number_argument == 0
          1
        else
          number_argument * factorial(number_argument - 1);
        end
      end
      factorial(number)
    end
    self.number = random_factorial
  end

end
