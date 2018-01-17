class AddNumberToPosts < ActiveRecord::Migration[5.1]
  def change
    add_column :posts, :number, :integer
  end
end
