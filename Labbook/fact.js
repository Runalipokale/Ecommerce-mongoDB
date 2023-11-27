var fact={  

    factorial: function(n)
  
  {
  
      var f=1,i;
  
    for(i=1;i<=n;i++)
  
     {     f=f*i;
  
     }
  
    console.log('factorial of '+n+' is:'+f);}};
  
   module.exports=fact;