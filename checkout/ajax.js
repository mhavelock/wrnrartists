
/**
 * This object makes the http-request to the backend
 * 
 * @param data {Object} Data like e.g. bank_code and cc_number depending on payment-type. This parameter may be set to
 * null initially. It can be set later on by calling setData().   
 * @param options {function} The name of the callback function
 */
function PayoneRequest ( data, options ) 
{
  this.requestData = {callback_method : "payoneCallbackFunction.callback"};
  this.data = data;
  this.options = options;
  
  if (typeof options.callback_function_name != "string") {
    throw new Error("Property 'options.callback_function_name' must be of type 'string'!");
  }
  
  /**
   * Set the data you want to send with the request
   * @param data {Object}
   */
  this.setData = function(data) {
    this.data = data;
  }
  
  /**
   * Merges the data set by the user with the transaction data depending on the transaction user id
   */
  this.mergeData = function() {
    
    // Merge the user's data with the account data
    if (this.data) {
      for (var key in this.data) {
        this.requestData[key] = this.data[key];
      }
    } else {
      throw new Error("No data is set");
    }
  }
  
  /**
   * Make the http-request
   */
  this.checkAndStore = function() {
    // Merge all data we want to send with the request. 
    this.mergeData();
    
    // Create request params
    var params = "?";
    for ( var key in this.requestData ) {
      params += encodeURIComponent(key) + "=" + encodeURIComponent(this.requestData[key]) + "&";
    }
    params = params.substring(0, params.length-1);
    
    payoneCallbackFunction.callbackFunctionName = this.options.callback_function_name;
    payoneCallbackFunction.returnType = this.options.return_type;
    
    // Send request
    var url = "https://secure.pay1.de/client-api/" + params;
    var payoneScript = document.createElement("script");
    payoneScript.setAttribute("type", "text/javascript");
    payoneScript.setAttribute("src", url );
    payoneCallbackFunction.payoneScript = payoneScript;
    document.getElementsByTagName("body")[0].appendChild(payoneScript);
  }
}
 
/**
 * This global object handles the response to the payone request and calls the user's callback after
 * the http-repsonse. 
 */
var payoneCallbackFunction = {
  returnType : "",
  payoneScript : null,
  callbackFunctionName : "",
  
  /**
   * This function is called from the script which is responded to the payone request.
   * It calls the user's own callback function. 
   */
  callback : function( response ) {
    document.getElementsByTagName("body")[0].removeChild(this.payoneScript);
    
    var callback = this.callbackFunctionName;
    if ( this.returnType == "object" ) {
    	var obj = response;
    	window[callback]( { get : function(index) { return obj[index]; } });
    }
    else {
      // Call the users callback-function.
      window[callback](response);
    } 
  }
}
