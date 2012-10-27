/**
* @copyright  Copyright (c) 2009 AITOC, Inc. 
*/
aitocmyspaceopenid =
{

    action: "login" ,

    _requestMagento: function( method , data , callback )
    {
        var ajaxUrl = aitocopenid.myspace.ajaxUrl+method;
        aitocopenid.requestMagento(ajaxUrl,data,callback);
    } ,

    logout: function()
    {
        aitocopenid.performLogout();
    } ,
    
    realize: function()
    {
        if (aitocopenid.speedup && aitocmyspaceopenid.action == 'login')
        {
            aitocmyspaceopenid._renderButton();
            aitocopenid.render();
        }
        else
        {
            aitocmyspaceopenid._requestMagento('check',null,aitocmyspaceopenid.realizeCheckResponse);
        }
    } ,
    
    launch: function()
    {
        aitocopenid.displayMode = 'details';
        aitocmyspaceopenid._renderButton();
        aitocmyspaceopenid.openLoginWindow();
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
                aitocmyspaceopenid._renderButton();
                break;
            case 'unknown':
                aitocmyspaceopenid._renderButton();
                aitocopenid.render();
                break;
        }
    } ,

    _renderButton: function()
    {
        var file = "myspaceicon.gif";
        switch (aitocopenid.displayMode)
        {
            case 'details':
            case 'normal':
                file = "myspacebutton.gif";            
                break;
        }
        var div    = document.getElementById("openid_myspace");
        var imgUrl = aitocopenid.baseUrl+'skin/frontend/default/default/images/aitoc/aitopenid/'+file;
        var html   = '<img style="cursor: pointer;" src="'+imgUrl+'" ';
        html      += 'onclick="aitocmyspaceopenid.openLoginWindow();" ';
        html      += '/>';
        div.innerHTML = html;
    } ,

    openLoginWindow: function()
    {
        var lw = window.open(aitocopenid.myspace.popupUrl,"myspaceauth","width=640,height=480,scrollbars=yes");
        if (lw)
        {
            lw.focus();
        }
    }

};
