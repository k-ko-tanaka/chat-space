class CreateGroupUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :group_users do |t|
      t.references :group, foreign_key: true #追加
      t.references :user, foreign_key: true #追加
      t.timestamps
    end
  end
end
