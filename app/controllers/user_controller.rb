class UserController < ApplicationController

  def preferences
    
  end

  def user_keywords
    @morning = Keyword.find_all_by_period_of_time_and_user_id('morning',current_user.id)
    @noon = Keyword.find_all_by_period_of_time_and_user_id('noon',current_user.id)
    @afternoon = Keyword.find_all_by_period_of_time_and_user_id('afternoon',current_user.id)
    @evening = Keyword.find_all_by_period_of_time_and_user_id('evening',current_user.id)
    @night = Keyword.find_all_by_period_of_time_and_user_id('night',current_user.id)

    @user_keywords = {
                      morning:    @morning,
                      noon:       @noon,
                      afternoon:  @afternoon,
                      evening:    @evening,
                      night:      @night
                      }

    render json: @user_keywords
  end

  def user_id

    render json: current_user.id

  end

  def keyword_destroy
    keyword_id = params[:id]
    item = Keyword.find(keyword_id)
    item.destroy

    render json: item
  end

  def keyword_create

    word_data = {
                keyword: params[:keyword],
                period_of_time: params[:period_of_time],
                user_id: params[:user_id].to_i
                }


    new_keyword = Keyword.create(word_data)

    render json: new_keyword

  end


end