    /** Connect to Moralis server */
    const serverUrl = "https://xcrzazjbleyc.usemoralis.com:2053/server";
    const appId = "3AIqttoCGiIXl5eGQU6W8VelPDd0fqmX47m2TTy5";
    Moralis.start({ serverUrl, appId });
    let currentTrade = {};
    let currentSelectSide;
    let tokens;

    /** Add from here down */
    async function login(){
      console.log("login clicked");
      var user = await Moralis.Web3.authenticate();
      if(user){
        console.log(user);
        user.set("nickname","VITALIK");
        user.set("fav_color","blue");
        user.save();
      }
    }

    async function init() {

      await Moralis.initPlugins();
      await Moralis.enable();
      await listAvaiableTokens();
      currentUser = Moralis.User.current();
        if(!currentUser){
          currentUser = await Moralis.Web3.authenticate();

        }
    }
    async function listAvaiableTokens(){
      const result = await Moralis.Plugins.oneInch.getSupportedTokens({
        chain: 'polygon', // The blockchain you want to use (eth/bsc/polygon)
      });
      tokens = result.tokens;
      console.log(tokens);
      let parent = document.getElementById("token_list");
      for( const address in tokens){
          let token = tokens[address];
          let div = document.createElement("div");
          div.setAttribute("data-address", address);
          div.className = "token_row";
          let html = `
          <img class = "token_list_img" src= "${token.logoURI}">
          <span class = "token_list_text">${token.symbol}</span>
          `
          div.innerHTML = html;
          div.onclick = (() => {selectToken(address)});
          parent.appendChild(div);
      }
    }

    function selectToken(address){
      closeModal();
      //let address = event.target.getAttribute("data-address");
      console.log(address);
      console.log(tokens);
      currentTrade[currentSelectSide] =  tokens[address];
      console.log(currentTrade);
      renderInterface();
      getQuote();

    }

    function renderInterface(){

      if(currentTrade.from){
        document.getElementById("from_token_img").src = currentTrade.from.logoURI;
        document.getElementById("from_token_text").innerHTML = currentTrade.from.symbol;
      }

      if(currentTrade.to){
        document.getElementById("to_token_img").src = currentTrade.to.logoURI;
        document.getElementById("to_token_text").innerHTML = currentTrade.to.symbol;
      }

    }

    function openModal(side){
      currentSelectSide = side;
      document.getElementById("token_modal").style.display = "block";
    }

    function closeModal(){
      document.getElementById("token_modal").style.display = "none";
    }

    async function getQuote(){
        if (!currentTrade.from|| !currentTrade.to || !document.getElementById("from_amount").value ) return;
        let amount = Number((document.getElementById("from_amount").value)*10**currentTrade.from.decimals)

        const quote = await Moralis.Plugins.oneInch.quote({
        chain: 'polygon',
        // The blockchain you want to use (eth/bsc/polygon)
        fromTokenAddress: currentTrade.from.address,
        // The token you want to swap
        toTokenAddress: currentTrade.to.address,
        // The token you want to receive
        amount: amount ,

      });

      console.log(quote);
      document.getElementById("gas_estimate").innerHTML = quote.estimatedGas;
      document.getElementById("to_amount").value = quote.toTokenAmount / (10**quote.toToken.decimals)
    }
    document.getElementById("from_token_select").onclick = (() => {openModal("from")});
    document.getElementById("to_token_select").onclick =(() => {openModal("to")});
    document.getElementById("from_amount").onblur = getQuote;

    async function trySwap(){
      let address = Moralis.User.current().get("ethAddress");
      console.log("let address " + address)
      let amount = Number((document.getElementById("from_amount").value)*10**currentTrade.from.decimals)
      if(currentTrade.from.symbol !== "ETH"){
        console.log("!==ETH")
        const allowance = await Moralis.Plugins.oneInch.hasAllowance({
          chain: 'polygon', // The blockchain you want to use (eth/bsc/polygon)
          fromTokenAddress: currentTrade.from.address, // The token you want to swap
          fromAddress: address, // Your wallet address
          amount: amount,
        });
      console.log(allowance);
      if(!allowance){
        console.log("!allowance")
          await Moralis.Plugins.oneInch.approve({
            chain: 'polygon', // The blockchain you want to use (eth/bsc/polygon)
            tokenAddress: currentTrade.from.address,  // The token you want to swap
            fromAddress: address,// Your wallet address
          });
        }
      }
      console.log("start doSwap")
      let receipt = await doSwap(address,amount);
      alert("Swap Complete");
    }


    async function doSwap(userAddress,amount) {
      console.log("doSwap")
      return await Moralis.Plugins.oneInch.swap({
        chain: 'polygon', // The blockchain you want to use (eth/bsc/polygon)
        fromTokenAddress: currentTrade.from.address, // The token you want to swap
        toTokenAddress: currentTrade.to.address, // The token you want to receive
        amount: amount,
        fromAddress: userAddress, // Your wallet address
        slippage: 1,
      });

    }

    async function logOut() {
      await Moralis.User.logOut();
      console.log("logged out");
    }

    init();
    document.getElementById("swap_button").onclick= trySwap;
    document.getElementById("modal_close").onclick= closeModal;
    document.getElementById("login_button").onclick = login;
    document.getElementById("logout_button").onclick = logOut;

    /** Useful Resources  */

    // https://docs.moralis.io/moralis-server/users/crypto-login
    // https://docs.moralis.io/moralis-server/getting-started/quick-start#user
    // https://docs.moralis.io/moralis-server/users/crypto-login#metamask

    /** Moralis Forum */

    // https://forum.moralis.io/
