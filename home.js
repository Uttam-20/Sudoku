var n;
function create(m)
{
 // document.getElementById("note").style.display="none";
  document.getElementById("sub").style.display="block";
  document.getElementById("3by3").style.display="none";
  document.getElementById("4by4").style.display="none";
  document.getElementById("6by6").style.display="none";
  document.getElementById("9by9").style.display="none";
n=m;
for(let i=0;i<n;i++)
{
  for(let j=0;j<n;j++)
  {
    var inputs=document.createElement("input");
    var x=document.getElementById("box");
    inputs.type="text";
    inputs.value="";
    inputs.style.fontSize="20px";
    if(n==3)
    {
      document.getElementById("box").style.width="150px";
      inputs.style.width="40px";
    }
    else if(n==4)
    {
      document.getElementById("box").style.width="200px";
      inputs.style.width="40px";
    }
    else if(n==6)
    {
      document.getElementById("box").style.width="300px";
      inputs.style.width="40px";
    } 
    else if(n==9)
    {
    inputs.style.width="40px";
    }
    inputs.style.color="green";
    inputs.style.textAlign="center";
    document.getElementById("box").appendChild(inputs);
}
}
document.getElementById("note").innerText="Enter values in boxes";
document.getElementById("note").style.font="bold";
document.getElementById("note").style.fontSize="20px";
}
function issafe(sol,num,row,col)
{
  var p,q;
  var i,j;
  if(n==9)
  {
   i=row-row%3;
   j=col-col%3;
    p=3;
    q=3;
  }
  else if(n==3)
  {
    i=0;
    j=0;
    p=0;
    q=0;
  }
  else if(n==6)
  {
     i=row-row%2;
     j=col-col%3;
    p=2;
    q=3;
  }
  else if(n==4)
  {
    i=row-row%2;
    j=col-col%2;
    p=2;
    q=2;
  }
  if(sol[row][col]!=0)
   return false;
  for(let k=0;k<n;k++)
  {
    if(sol[row][k]==num)
     return false;
  }
  for(let k=0;k<n;k++)
  {
    if(sol[k][col]==num)
     return false;
  }
  for(let k=i;k<i+p;k++)
  {
    for(let l=j;l<j+q;l++)
    {
      if(sol[k][l]==num)
       return false;
    }
  }
  return true;
}
function sudoku(sol)
{
  var empty=true;
  var row,col;
  for(let i=0;i<n;i++)
  {
    for(let j=0;j<n;j++)
    {
      if(sol[i][j]==0)
      {
         empty=false;
        row=i;
        col=j;
        break;
      }
    }
    if(!empty)
     break;
  }
  if(empty)
   return true;
     for(var num=1;num<=n;num++)
     {
        if(issafe(sol,num,row,col))
        {
          sol[row][col]=num;
         if(sudoku(sol))
          return true;
          sol[row][col]=0;
        }
     }
     return false;
}
function solve()
{
  document.getElementById("note").style.visibility="hidden";
  document.getElementById("sub").style.display="none";
  var dup=new Array(n);
  var sol=new Array(n);
  for(let i=0;i<n;i++)
  {
   sol[i]=new Array(n);
   dup[i]=new Array(n);
  }
  const nodes=document.getElementById("box").childNodes;
  var k=1;
 for(let i=0;i<n;i++)
{
    for(let j=0;j<n;j++)
     {
      if(nodes[k].value=="")
     sol[i][j]=0;
      else if(nodes[k].value>n || nodes[k].value<1)
      {
        document.getElementById("ans").innerText="Error:Please Enter Values Only between 1 and "+n;
        document.getElementById("ans").style.color="red";
        document.getElementById("ans").style.fontSize="30px";
        document.getElementById("box").style.display="none";
        document.getElementById("refresh").style.display="block";
        return;
      }
          else
        sol[i][j]=parseInt(nodes[k].value);
        dup[i][j]=sol[i][j];
        k++;
     }
}
  if(sudoku(sol))
 {
  var k=1;
    for(let i=0;i<n;i++)
    {
      for(let j=0;j<n;j++)
      {
      var element=document.createElement("input");
      element.type="text";
      element.value=sol[i][j].toString();
      var node=document.getElementById("box").childNodes;
      if(dup[i][j]==0)
      element.style.color="red";
      else
      element.style.color="green";
      element.style.fontSize="20px";
      element.style.width="40px";
      element.style.textAlign="center";
      var x=document.getElementById("box");
     element.readOnly=true;
      x.replaceChild(element,node[k++]);
    }
  }
 }
   else
   document.getElementById("ans").innerText="Not possible"; 
   document.getElementById("refresh").style.display="block";
}