/**
* @copyright  Copyright (c) 2009 AITOC, Inc. 
*/
aitocfacebookopenid =
{

    action: 'login' ,

    _requestMagento: function( method , data , callback )
    {
        var ajaxUrl = aitocopenid.facebook.ajaxUrl+method;
        aitocopenid.requestMagento(ajaxUrl,data,callback);
    } ,

    logout: function()
    {
        aitocfacebookopenid.action = 'logout';
        aitocfacebookopenid.realize();
    } ,

    realize: function()
    {
        if(aitocopenid.facebook.key)
        {
            if (aitocopenid.speedup && aitocfacebookopenid.action == 'login')
            {
                aitocfacebookopenid.render();
            }
            else
            {
                FB.init(aitocopenid.facebook.key,aitocopenid.baseUrl+"xd_receiver.htm");
                FB.ensureInit(aitocfacebookopenid.performLoad);
            }
        }
        else
        {
            aitocfacebookopenid.render();
        }
    } ,
    
    launch: function()
    {
        aitocfacebookopenid.action = 'launch';
        aitocfacebookopenid.realize();
    } ,

    performLoad: function()
    {
        switch(aitocfacebookopenid.action)
        {
            case 'launch':
                aitocopenid.displayMode = 'details';
                aitocfacebookopenid._renderButton();
                try
                {
                    aitocfacebookopenid.action = 'login';
                    FB.Connect.requireSession(aitocfacebookopenid.performLoad);
                }
                catch (e)
                {
                    aitocfacebookopenid.render();
                }
                break;
            case 'logout':
                FB.Connect.logoutAndRedirect (aitocopenid.successUrl?aitocopenid.successUrl:document.URL);
                break;
            case 'login':
                aitocfacebookopenid._requestMagento("check",null,aitocfacebookopenid.realizeCheckResponse);
                break;
        }
    } ,

    render: function()
    {
        aitocfacebookopenid._renderButton();
        aitocopenid.render();
    } ,

    realizeCheckResponse: function( response )
    {
        switch(response.responseJSON.status)
        {
            case 'registered':
                aitocopenid.gotoEditAccount();
                break;
            case 'logedin':
                aitocopenid.refreshPage(response.responseJSON.successUrl);
                break;
            case 'unknown':
                aitocfacebookopenid.render();
                break;
            case 'user':
                aitocfacebookopenid._renderButton();
                break;
        }
    } ,

    realizeUnauthorized: function()
    {
        aitocfacebookopenid._renderButton();
    } ,

    _renderButton: function()
    {
        var style = "small";
        switch (aitocopenid.displayMode)
        {
            case 'details':
            case 'normal':
                style = "medium";            
                break;
        }
        if (aitocopenid.speedup)
        {
            var img = style == "small" ? "fb16.gif" : "fb.gif";
            img = aitocopenid.baseUrl+aitocopenid.imgUrl+img;
            var div = $("openid_facebook");
            if (div)
            {
                div.innerHTML = 
                '<img style="cursor: pointer;" onclick="return aitocfacebookopenid.speedLogin();" src="'+img+'">';
            }
        }
        else
        {
            var div  = document.getElementById("openid_facebook");
            var html = '<fb:login-button onlogin="aitocfacebookopenid.realize();"';
            html += ' size="'+style+'" background="dark" length="short"></fb:login-button>';
            div.innerHTML = html;
            FB.XFBML.Host.parseDomTree();
        }
    } ,
    
    speedLogin: function()
    {
        FB.init(aitocopenid.facebook.key,aitocopenid.baseUrl+"xd_receiver.htm");
        FB.ensureInit(function()
        {
            try
            {
                aitocfacebookopenid.action = 'login';
                FB.Connect.requireSession(aitocfacebookopenid.performLoad);
            }
            catch (e)
            {
                aitocfacebookopenid.render();
            }
        });
        return false;
    }

};