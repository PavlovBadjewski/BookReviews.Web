BRM.ContentDisplayController = function ($scope, Global) {
    $scope.Shared = {
        'Footer': '/Content/html/shared/_footer.html',
        'SideNav': '/Content/html/shared/_sidenav.html',
        'MainNav': '/Content/html/shared/_mainnav.html'
    }

    $scope.About = {
        'Main': '/Content/html/about/index.html'
    };

    $scope.Reviews = {
        'Main': '/Content/html/reviews/index.html',
        'RandomReview': '/Content/html/reviews/_randomReview.html',
        'RecentReview': '/Content/html/reviews/_recentReview.html',
        'FullReview': '/Content/html/reviews/_fullReview.html'
    };

    $scope.Authors = {
        'Main': '/Content/html/authors/index.html',
        'RandomAuthor': '/Content/html/authors/_randomAuthor.html',
        'RecentAuthor': '/Content/html/authors/_recentAuthor.html',
        'FullAuthor': '/Content/html/authors/_fullAuthor.html'
    };

    $scope.Contact = {
        'Main': '/Content/html/contact/index.html'
    };

    $scope.Section = Global.Section;
	
	$scope.SwitchSection = function(section) {
	    $scope.Section = Global.Section = section;
	};

    return $scope;
};

