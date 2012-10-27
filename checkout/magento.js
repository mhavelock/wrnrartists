/**
* @copyright  Copyright (c) 2009 AITOC, Inc. 
*/
aitocopenid =
{
        
    imgUrl: "skin/frontend/default/default/images/aitoc/aitopenid/" , 
        
    successUrl: null ,
    
    _currentProvider: null ,
        
    logoutService: null ,
        
    init: null ,

    baseUrl: null ,
    
    baseStoreUrl: null ,
    
    editAccountUrl: null ,
    
    speedup: null ,
    
    _tryFriendConnect: false ,

    google: {
        ajaxUrl: null ,
        key: null ,
        require: null ,
        group: null
    } ,

    myspace: {
        ajaxUrl: null ,
        popupUrl: null
    } ,

    facebook: {
        ajaxUrl: null ,
        key: null ,
        require: null
    } ,
    
    displayMode: null ,

    _cascade: null ,

    setCascade: function( cascade )
    {
        aitocopenid._cascade = cascade;
    } ,

    refreshPage: function( successUrl )
    {
        document.location.href = successUrl ? successUrl : document.URL;
    } ,
    
    gotoEditAccount: function()
    {
        document.location.href = aitocopenid.editAccountUrl;
    } ,

    gotoMainPage: function()
    {
        document.location.href = aitocopenid.realBaseStoreUrl;
    } ,

    requestMagento: function( ajaxUrl , data , callback )
    {
        var postBody = [];
        if('object' == typeof(data))
        {
            for(var field in data)
            {
                postBody[postBody.length] = field+"="+encodeURIComponent(data[field]);
            }
            postBody = postBody.join("&");
        }
        else
        {
            postBody = data;
        }
        var req = new Ajax.Request(ajaxUrl,{
          method: 'post',
          postBody: postBody,
          onSuccess: callback
        });
    } ,

    _renderItem: function( item )
    {
        switch(item)
        {
            case 'google':
                aitocopenid._renderGoogle();
                break;
            case 'myspace':
                aitocopenid._renderMyspace();
                break;
            case "facebook":
                aitocopenid._renderFacebook();
                break;
        }
    } ,

    _renderGoogle: function()
    {
        aitocgoogleopenid.realize();
    } ,

    _renderMyspace: function()
    {
        aitocmyspaceopenid.realize();
    } ,

    _renderFacebook: function()
    {
        aitocfacebookopenid.realize();
    } ,

    _shiftCascade: function()
    {
        var size = aitocopenid._cascade.length;
        if (size)
        {
            var list = [];
            var result = aitocopenid._cascade[0];
            for (var i = 1 ; i < size ; ++i)
            {
                list[list.length] = aitocopenid._cascade[i];
            }
            aitocopenid._cascade = list;
            return result;
        }
    } ,
    
    _init: function()
    {
        if(null != aitocopenidConfig)
        {
            for(var key in aitocopenidConfig)
            {
                this[key] = aitocopenidConfig[key];
            }
            aitocopenidConfig = null;
        }
        if(aitocopenid.checkingForInited())
        {
            return true;
        }
        else
        {
            setTimeout(aitocopenid.init,100);
            return false;
        }
    } ,
    
    launch: function()
    {
        aitocopenid.init = aitocopenid.launch;
        if (aitocopenid._init())
        {
            switch (aitocopenid._shiftCascade())
            {
                case 'google':
                    aitocgoogleopenid.launch();
                    break;
                case 'facebook':
                    aitocfacebookopenid.launch();
                    break;
                case 'myspace':
                    aitocmyspaceopenid.launch();
                    break;
            }
        }
    } ,

    render: function()
    {
        aitocopenid.init = aitocopenid.render;
        if(aitocopenid._init())
        {
            var item = aitocopenid._shiftCascade();
            aitocopenid._renderItem(item);
        }
    } ,

    logout: function( service )
    {
        aitocopenid.logoutService = aitocopenid.logoutService ? aitocopenid.logoutService : service;
        service = aitocopenid.logoutService;
        aitocopenid.init = aitocopenid.logout;
        if(aitocopenid._init())
        {
            switch (service)
            {
                case 'google':
                    aitocgoogleopenid.logout();
                    break;
                case 'facebook':
                    aitocfacebookopenid.logout();
                    break;
                case 'myspace':
                    aitocmyspaceopenid.logout();
                    break;
            }
        }
    } ,
    
    performLogout: function()
    {
        if (aitocopenid.successUrl)
        {
            aitocopenid.gotoMainPage();
        }
        else
        {
            aitocopenid.refreshPage();
        }
    } ,
     
    _containProvider: function (provider)
    {
        for (var i = 0 ; i < aitocopenid._cascade.length ; ++i)
        {
            if (provider == aitocopenid._cascade[i])
            {
                return true;
            }
        }
        return false;
    } ,
    
    checkingForInited: function()
    {
        var as = new Array();
        var realize = true;
        if (aitocopenid._containProvider('google') && aitocopenid.google.require)
        {
            if("undefined" == typeof(google))
            {
                realize = false;
            } 
            else if(!aitocopenid._tryFriendConnect)
            {
                realize = false;
                google.load('friendconnect', '0.8');
                aitocopenid._tryFriendConnect = true;
            } 
            else if("undefined" == typeof(google.friendconnect))
            {
                realize = false;
            }
            else if("undefined" == typeof(google.friendconnect.container))
            {
                realize = false;
            }
        }
        if (aitocopenid._containProvider('facebook') && aitocopenid.facebook.require)
        {
            if ("undefined" == typeof(FB))
            {
                realize = false;
            }
        }
        return realize;
    }

};