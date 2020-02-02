class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.string :content  #add
      t.string :image  #add
      t.references :group, foreign_key: true  #add
      t.references :user, foreign_key: true  #add
      t.timestamps
    end
  end
end
