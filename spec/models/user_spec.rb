require 'rails_helper'

RSpec.describe User, type: :model do
  before do
    @user = FactoryBot.build(:user)
  end

  describe 'ユーザー登録機能' do
    context 'ユーザー登録できるとき' do
      it '全ての項目を正しく入力すれば登録できる' do
        expect(@user).to be_valid
      end
    end

    context 'ユーザー登録できないとき' do
      it 'player_nameが空では登録できない' do
        @user.player_name = ""
        @user.valid?
        expect(@user.errors.full_messages).to include("Player name can't be blank")
      end

      it 'passwordが空では登録できない' do
        @user.password = nil
        @user.valid?
        expect(@user.errors.full_messages).to include("Password can't be blank")
      end

      it 'password_confirmationが空では登録できない' do
        @user.password_confirmation = nil
        @user.valid?
        expect(@user.errors.full_messages).to include("Password confirmation can't be blank")
      end

      it 'passwordとpassword_confirmationが一致していないと登録できない' do
        @user.password_confirmation = "bbb222"
        @user.valid?
        expect(@user.errors.full_messages).to include("Password confirmation doesn't match Password")
      end

      it 'passwordは全角文字だと登録できない' do
        @user.password = "ａａａ１１１"
        @user.valid?
        expect(@user.errors.full_messages).to include("Password is invalid")        
      end

      it 'passwordは数字のみでは登録できない' do
        @user.password = "111111"
        @user.valid?
        expect(@user.errors.full_messages).to include("Password is invalid")   
      end

      it 'passwordは英文字のみでは登録できない' do
        @user.password = "aaaaaa"
        @user.valid?
        expect(@user.errors.full_messages).to include("Password is invalid")
      end

      it 'passwordが5文字以下だと登録できない' do
        @user.password = "aa111"
        @user.valid?
        expect(@user.errors.full_messages).to include("Password is too short (minimum is 6 characters)")
      end
    end
  end
end
