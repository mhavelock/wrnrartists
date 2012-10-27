/**
* @copyright  Copyright (c) 2009 AITOC, Inc. 
*/
aitocgoogleopenid =
{

    action: 'login' ,

    securityToken: null ,
    
    speedLoginState: null ,

    _requestMagento: function( method , data , callback )
    {
        var ajaxUrl = aitocopenid.google.ajaxUrl+method;
        aitocopenid.requestMagento(ajaxUrl,data,callback);
    } ,

    logout: function()
    {
        aitocgoogleopenid.action = 'logout';
        aitocgoogleopenid.realize();
    } ,
    
    realize: function()
    {
        google.friendconnect.container.setParentUrl(aitocopenid.baseStoreUrl);
        
        if(aitocopenid.google.key)
        {
            if (aitocopenid.speedup && aitocgoogleopenid.action == 'login')
            {
                aitocgoogleopenid._renderButton();
                aitocopenid.render();
            }
            else
            {
                google.friendconnect.container.initOpenSocialApi({
                  site: aitocopenid.google.key ,
                  onload: aitocgoogleopenid.performLoad
                });
            }
        }
        else
        {
            aitocopenid.render();
        }
    } ,
    
    launch: function()
    {
        aitocgoogleopenid.action = 'launch';
        aitocgoogleopenid.realize();
    } ,

    performLoad: function( securityToken )
    {
      switch(aitocgoogleopenid.action)
      {
          case 'launch':
              aitocopenid.displayMode = 'details';
              aitocgoogleopenid._renderButton();
              try
              {
                  aitocgoogleopenid.action = 'login';
                  google.friendconnect.requestSignIn();
              }
              catch (e)
              {
                  
              }
              break;
          case 'login':
             aitocgoogleopenid.securityToken = securityToken;
             var request = {
               st: aitocgoogleopenid.securityToken
             };
             aitocgoogleopenid._requestMagento('check',request,aitocgoogleopenid.realizeCheckResponse);
             break;
         case 'logout':
             aitocgoogleopenid.action = 'loggedout';
             google.friendconnect.requestSignOut();
             
             break;
         case 'loggedout':
             aitocopenid.performLogout();
             break;
      }
    } ,
    
    speedLogin: function()
    {
        google.friendconnect.container.initOpenSocialApi({
          site: aitocopenid.google.key ,
          onload: function( securityToken )
          {
            if (aitocgoogleopenid.speedLoginState == 'progress')
            {
                aitocgoogleopenid.performLoad(securityToken);
                return false;
            }
            try
            {
                aitocgoogleopenid.action = 'login';
                aitocgoogleopenid.speedLoginState = 'progress';
                google.friendconnect.requestSignIn();
            }
            catch (e)
            {
                
            }
          }
        });
        return false;
    } ,

    realizeCheckResponse: function( response )
    {
        switch(response.responseJSON.status)
        {
            case "registered":
                aitocopenid.gotoEditAccount();
                break;
            case "logedin":
                aitocopenid.refreshPage(response.responseJSON.successUrl);
                break;
            case 'user':
                aitocgoogleopenid._renderButton("logout");
                break;
            case 'unknown':
                aitocgoogleopenid._renderButton();
                aitocopenid.render();
                break;
        }
    } ,

    _renderButton: function( caption )
    {
        var style = "text";
        switch (aitocopenid.displayMode)
        {
            case 'small':
                style = "text";
                break;
            case 'details':
                style = "standard";
                break;
            case 'normal':
                style = "standard";            
                break;
        }
        var params = {id: "openid_google", style: style};
        if (caption)
        {
            switch (caption)
            {
                case "logout":
                    params.text = "Sign out";
                    break;
            }
        }
        if (aitocopenid.speedup)
        {
            var img = style == "text" ? "group16.gif" : "googleico.png";
            if (aitocopenid.google.group && style == "text")
            {
                img = "google16.gif";
            }
            img = aitocopenid.baseUrl+aitocopenid.imgUrl+img;
            var div = $("openid_google");
            if (div)
            {
                div.innerHTML = 
                    '<img style="cursor: pointer;" onclick="return aitocgoogleopenid.speedLogin();"  src="'+img+'"/>';
            }
        }
        else
        {
            google.friendconnect.renderSignInButton(params);
        }
    } ,
    
    _hideButton: function()
    {
        document.getElementById("openid_google").innerHTML = "";
    }
    
};