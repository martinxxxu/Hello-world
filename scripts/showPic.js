//图片切换
function showPic(whichpic)
	{
		if(!document.getElementById("placeholder")) return false;

		var source=whichpic.getAttribute("href");
		var placeholder=document.getElementById("placeholder");
		if (placeholder.nodeName!='IMG') return false;
	
		placeholder.setAttribute("src",source);

		if (document.getElementById("description")){
			var text=whichpic.getAttribute("title") ? whichpic.getAttribute("title") : "";
			var description=document.getElementById("description");
			if (description.firstChild.nodeType==3){
				description.firstChild.nodeValue=text;
			}
			
		}
		
		return true;
	}
//body下的子元素统计
function countBodyChildren()
	{
		var body_element=document.getElementsByTagName("body")[0];
		alert(body_element.childNodes.length);
		/*for (var i=0;i<body_element.childNodes.length;i++)
		{
			alert(body_element.childNodes[i].nodeValue);
		}*/

	}

//onclick事件绑定
function prepareGallery()
	{
        
		if(!document.getElementsByTagName) return false;
		if(!document.getElementById) return false;
		if(!document.getElementById("imagegallery")) return false;

		var gallery=document.getElementById("imagegallery");
		var links=gallery.getElementsByTagName("a");
        for(var i=0;i<links.length;i++)
        {
        	links[i].onclick=function(){
        		 return !showPic(this);
             }
        }
	}

//添加img元素
//<img id="placeholder" src="images/placeholder.gif" alt="my image Gallery"/>
//<p id="description">Choose an image.</p>
function preparePlaceholder(){
	//平稳退化保证
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imagegallery")) return false;

	var placeholder=document.createElement("img");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("src","images/placeholder.gif");
	placeholder.setAttribute("alt","my image Gallery");
	
	var description=document.createElement("p");
	description.setAttribute("id","description");
	var desctext=document.createTextNode("Choose an image");
	description.appendChild(desctext);
    //新增元素插入ul之前
	//var gallery=document.getElementById("imagegallery");
	//gallery.parentNode.insertBefore(placeholder,gallery);
	//gallery.parentNode.insertBefore(description,gallery);
	//新增元素插入ul之后
	var gallery=document.getElementById("imagegallery");
	insertAfter(placeholder,gallery);
	insertAfter(description,placeholder);

}



//共享onload事件
function addLoadEvent(func){
	var oldonload=window.onload;
	if(typeof window.onload!='function'){
		window.onload=func;
	}else{
		window.onload=function(){
			oldonload();
			func();
		}
	}


}
//现有元素后插入一个新元素
function insertAfter(newElement,targetElement){
	var parent=targetElement.parentNode;
	if (parent.lastChild==targetElement){
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement,targetElement.nextSlibing);
	}
}



//window.onload=preparePlaceholder;
          
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);