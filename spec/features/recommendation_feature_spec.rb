describe "A user arriving at the website" do
  before do
    visit root_path
  end
  it "page should be the recommendations page" do
    current_path.should == root_path
  end

  # describe "Recommendations should be presented to the user" do
  #   before do
  #     visit root_path
  #   end
  #   describe "I should visit the beer edit page"
  #     before do
  #       @beer_id = Beer.find_by_name(@beer_name)
  #     end
  #     it "should be the edit page" do
  #       current_path.should == edit_beer_path(@beer_id)
  #     end
  # end

end