> create React app
> tailwind installation


>> bug fix > redirection Bug fix > should use navigate inside childs > better to put up the useEffect hook at the place from where we can access it > so putting it in header would make sense as it will always be available at all pages> from their on we can use navigation 


>>also navigation needs to be done only and only oncee the user is authenticated so >  after firebase authentication APi we should navigate to required pages.

>> if user is logged in > cant go to login page
>> if use is logged Out > cant go to browse page
 
>> unsubscribed to the onAuthStateChanged callback > good practice > 

>> register for tmdb > get access token > 
> get data from TMDB now playing movie List.


>> browse Section > 1.video 2.List of Movies