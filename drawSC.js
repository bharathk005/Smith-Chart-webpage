var width = 600;
var height = 600;
var r = 300;
var c;
var zlr=0.0;
var zli=0.0;
var z0=0.0; 
var cx=0;var cy=0;
var vswrval = 0.0;
var zinr=0;var zini=0;
window.addEventListener('load',function(){

		document.getElementById("about").addEventListener("mouseover",change_a1);
		document.getElementById("about").addEventListener("mouseout",change_a2);

		document.getElementById("credit").addEventListener("mouseover",change_cr1);
		document.getElementById("credit").addEventListener("mouseout",change_cr2);

		document.getElementById("contact").addEventListener("mouseover",change_co1);
		document.getElementById("contact").addEventListener("mouseout",change_co2);


		document.getElementById('calc').addEventListener("click",calculate);
		document.getElementById('plot').addEventListener("click",plot);
		document.getElementById('circ_plot').addEventListener("click",circ_calc);
		
		document.getElementById('admittance').addEventListener("click",draw_admit);
		document.getElementById('impedance').addEventListener("click",draw_imp);
		setC();	
		setgrad();
		draw_imp();
		

});


function change_a1(){document.getElementById("im1").src = "img/bulb2.png";}
function change_a2(){document.getElementById("im1").src = "img/bulb1.png";}

function change_cr1(){document.getElementById("im2").src = "img/credit2.png";}
function change_cr2(){document.getElementById("im2").src = "img/credit1.png";}

function change_co1(){document.getElementById("im3").src = "img/mail2.png";}
function change_co2(){document.getElementById("im3").src = "img/mail1.png";}

function circ_plot(){

					
                    
                    var zinrr =zinr/50;var zinii=zini/50;
                    
                    var zinX = (1+ir2x(zinrr, zinii))*width/2;
                    var zinY = (1-ir2y(zinrr, zinii))*height/2;

                    var ctx = c.getContext("2d");
					ctx.strokeStyle = "green";
				    ctx.beginPath();
					ctx.arc(zinX,zinY,2,0,2*Math.PI);
					ctx.stroke();

					// ctx.moveTo(zinX-7,zinY);
					// ctx.lineTo(zinX+7,zinY);
					// ctx.stroke();
					// ctx.moveTo(zinX,zinY-7);
					// ctx.lineTo(zinX,zinY+7);
					// ctx.stroke();
				
}


function circ_calc(){
	                var z1 = document.getElementById('z1').value;
	                var z2 = document.getElementById('z2').value;
	                var z3 = document.getElementById('z3').value;
	                var ZinrP = document.getElementById('zinr');
	                var ZiniP = document.getElementById('zini');
	                var Lr = document.getElementById('loadr').value;
	                var Li = document.getElementById('loadi').value;
	                var f1 = document.getElementById('freq1').value;
	                var f2 = document.getElementById('freq2').value;
	               
	                var z1temp = document.getElementById('z1s');
	                var z1s = z1temp.options[z1temp.selectedIndex].text;

	                var z2temp = document.getElementById('z2s');
	                var z2s = z2temp.options[z2temp.selectedIndex].text;

	                var z3temp = document.getElementById('z3s');
	                var z3s = z3temp.options[z3temp.selectedIndex].text;

	                

	                     
	                  var inc = (f2-f1)/199;
	                 for(var f=f1;f<=f2;f = f+inc)
	                 {
	                 
                     var w = (2*Math.PI*f*1000*1000*1000);

	                 var Z2r=0,Z1r=0,Z3r=0;
	                 var Z2i=0,Z1i=0,Z3i=0;
	                 if(z2s == 'R(ohm)'){
	                 		Z2r = z2;
	                 }
	                 else if(z2s == 'L(nH)'){
	                 		Z2i = w*z2*Math.pow(10,-9);
	                 }
	                 else if(z2s == 'C(pF)'){
	                 		Z2i = 1/(w*z2*Math.pow(10,-12));
	                 }

	                 if(z3s == 'R(ohm)'){
	                 		Z3r = z3;
	                 }
	                 else if(z3s == 'L(nH)'){
	                 		Z3i = w*z3*Math.pow(10,-9);
	                 }
	                 else if(z3s == 'C(pF)'){
	                 		Z3i = 1/(w*z3*Math.pow(10,-12));
	                 }

	                if(z1s == 'R(ohm)'){
	                 		Z1r = z1;
	                 }
	                 else if(z1s == 'L(nH)'){
	                 		Z1i = w*z1*Math.pow(10,-9);
	                 }
	                else if(z1s == 'C(pF)'){
	                 		Z1i = 1/(w*z1*Math.pow(10,-12));
	                 }
	                var xr = Number(Z2r)+Number(Lr);
	                var xi = Number(Z2i)+Number(Li);

	                var yr = (Number((Number(Z3r*xr)-Number(Z3i*xi))*(Number(Z3r)+Number(xr)))+Number((Number(Z3i*xr)+Number(xi*Z3r))*(Number(Z3i)+Number(xi))))/(Math.pow(Number(Z3r)+Number(xr),2)+Math.pow(Number(Z3i)+Number(xi),2));
	                var yi = (Number((Number(Z3i*xr)+Number(xi*Z3r))*(Number(Z3r)+Number(xr)))-Number((Number(Z3r*xr)-Number(Z3i*xi))*(Number(Z3i)+Number(xi))))/(Math.pow(Number(Z3r)+Number(xr),2)+Math.pow(Number(Z3i)+Number(xi),2));

	                zinr = Number(Z1r)+Number(yr);
	                zini = Number(Z1i)+Number(yi);
	                f = Number(f) + Number(inc);
	                 
	          




	                circ_plot();
	            }
                    
       			    ZinrP.innerHTML = Number(zinr).toFixed(1);
	                ZiniP.innerHTML = Number(zini).toFixed(1);
}


function plot(){

	var val = (width/2)*(ir2x(vswrval,0));
	var ctx = c.getContext("2d");
		ctx.strokeStyle = "blue";
	    ctx.beginPath();
		ctx.arc(width/2,height/2,val,0,2*Math.PI);
		ctx.stroke();
}


function calculate(){
	zlr = document.getElementById('zlr').value;
	zli = document.getElementById('zli').value;
	z0 = document.getElementById('z0').value;



	
	var ref_rval = ((Math.pow(zlr-1,2)-Math.pow(zli,2))/(Math.pow(zlr+1,2)+Math.pow(zli,2)));
    var ref_ival = ((2*(zlr-1)*zli)/(Math.pow(zlr+1,2)+Math.pow(zli,2)));


    var mg1  =Math.sqrt(Math.pow((zlr - z0),2)+Math.pow(zli,2));


    var mg2 = Math.sqrt(Math.pow(Number(zlr)+Number(z0),2)+Math.pow(zli,2));

    var modGama = mg1/mg2;
    var phase = (Math.atan(ref_ival/ref_rval));

    vswrval = (1+modGama)/(1-modGama);

    document.getElementById('vswr').innerHTML = vswrval.toFixed(2);
    document.getElementById('rcmag').innerHTML = modGama.toFixed(2);
    document.getElementById('rcphase').innerHTML = phase.toFixed(2);

}



function setC(){
	c = document.getElementById("chart");
	c.addEventListener("mousedown",pressed,false);
	c.width = width;
	c.height = height;

}

function setgrad(){
	
	var ctx = c.getContext("2d");
	var grad = ctx.createLinearGradient(0,600,0,0);
	grad.addColorStop(0,"#99e6ff");
	grad.addColorStop(1,"white");
	ctx.fillStyle = grad;
	ctx.fillRect(0,0,600,600);

}


function draw_imp(){

	var ctx = c.getContext("2d");
	
		ctx.strokeStyle = "#ffffff";
		ctx.fillRect(0,0,600,600);

		ctx.strokeStyle = "#000000";


//Draw constant r circles
 	  cx = width; cy = height/2; r = 0;
 	  for (var i =1;i <7;i=i+0.5)
     {

        ctx.beginPath();
		ctx.arc(cx,cy,r,0,2*Math.PI);
		ctx.stroke();       
        
        cx = cx - Math.pow(2,i);
        r = (width - cx);
     }
//Draw circle passing through center
	cx = width*3/4;cy = width/2;r=width/4;
	    ctx.beginPath();
		ctx.arc(cx,cy,r,0,2*Math.PI);
		ctx.strokeStyle = "#ff0000";
		ctx.stroke();

//Draw constant i circles +ve axis
	 ctx.strokeStyle = "#000000";
     cx = width;cy=height/2;r=0; 
     for (var i =1;i <10;i=i+1)
     {
     	cy = cy - Math.pow(2,i);
        r = (height/2-cy);

        ctx.beginPath();
		ctx.arc(cx,cy,r,Math.PI/2,Math.PI/2+(2*Math.atan(width/(2*r))));
		ctx.stroke(); 
     }

//Draw constant i circles -ve axis 
	cx = width;cy=height/2;r=0; 
    for (var i =1;i <10;i=i+1)
     {
     	cy = cy + Math.pow(2,i);
        r = (cy-height/2);

     	ctx.beginPath();
		ctx.arc(cx,cy,r,(3*Math.PI/2)-(2*Math.atan(width/(2*r))),3*Math.PI/2);
		ctx.stroke(); 

     }


//Draw outer most circle in red
	ctx.strokeStyle = "#ff0000";
	ctx.beginPath();
    ctx.arc(width/2,height/2,width/2,0,2*Math.PI);
    ctx.stroke(); 
//draw line in the middle
	ctx.moveTo(0,width/2);
	ctx.lineTo(width,width/2);
	ctx.stroke();

}
function draw_admit(){

		var ctx = c.getContext("2d");

		ctx.strokeStyle = "#ffffff";
		ctx.fillRect(0,0,600,600);

		ctx.strokeStyle = "#000000";
	//Draw constant r circles
 	  cx = 0; cy = height/2; r = 0;
 	  for (var i =1;i <7;i=i+0.5)
     {

        ctx.beginPath();
		ctx.arc(cx,cy,r,0,2*Math.PI);
		ctx.stroke();       
        
        cx = cx + Math.pow(2,i);
        r = ( cx);
     }

     //Draw circle passing through center
	cx = width*1/4;cy = width/2;r=width/4;
	    ctx.beginPath();
		ctx.arc(cx,cy,r,0,2*Math.PI);
		ctx.strokeStyle = "#ff0000";
		ctx.stroke();

//Draw constant i circles +ve axis
	 ctx.strokeStyle = "#000000";
     cx = 0;cy=height/2;r=0; 
     for (var i =1;i <10;i=i+1)
     {
     	cy = cy - Math.pow(2,i);
        r = (height/2-cy);

        ctx.beginPath();
		ctx.arc(cx,cy,r,Math.PI/2-(2*Math.atan(width/(2*r))),Math.PI/2);
		ctx.stroke(); 
     }
  //Draw constant i circles -ve axis 
	cx = 0;cy=height/2;r=0; 
    for (var i =1;i <10;i=i+1)
     {
     	cy = cy + Math.pow(2,i);
        r = (cy-height/2);

     	ctx.beginPath();
		ctx.arc(cx,cy,r,3*Math.PI/2,(3*Math.PI/2)+(2*Math.atan(width/(2*r))));
		ctx.stroke(); 

     }

  //Draw outer most circle in red
	ctx.strokeStyle = "#ff0000";
	ctx.beginPath();
    ctx.arc(width/2,height/2,width/2,0,2*Math.PI);
    ctx.stroke(); 
//draw line in the middle
	ctx.moveTo(0,width/2);
	ctx.lineTo(width,width/2);
	ctx.stroke();




}

var crn=width,cin=width/2; 

function pressed(event){
	var ctx2 = c.getContext("2d");
	
	//lighten the previous line
	ctx2.save();
	ctx2.setLineDash([5]);
	ctx2.strokeStyle = "#b3ffb3";
    ctx2.beginPath();
    ctx2.arc(crn,width/2,width-crn,0,2*Math.PI);
    ctx2.stroke(); 
    ctx2.beginPath();
    if(cin<height/2)  ctx2.arc(width,cin,(width/2)-cin,Math.PI/2,Math.PI/2+(2*Math.atan(width/(2*((width/2)-cin)))));
    else              ctx2.arc(width,cin,cin-width/2,(3*Math.PI/2)-(2*Math.atan(width/(2*(cin-width/2)))),3*Math.PI/2);
	ctx2.stroke(); 	
    ctx2.restore();
	
	//draw the new dashed line for the clicked area
	var xm = event.pageX-10;	// 10 is to offset mouse length
	var ym = event.pageY-16;
	crn = (Math.pow(xm,2)+Math.pow(ym-(width/2),2)-Math.pow(width,2))/(2*(xm-width));
	cin = (Math.pow(xm-width,2)+Math.pow(ym,2)-Math.pow(height/2,2))/(2*(ym-height/2));
	ctx2.save();
	ctx2.setLineDash([5]);
	ctx2.strokeStyle = "green";
    ctx2.beginPath();
    ctx2.arc(crn,width/2,width-crn,0,2*Math.PI);
    ctx2.stroke(); 
    ctx2.beginPath();
    if(cin<height/2)  ctx2.arc(width,cin,(width/2)-cin,Math.PI/2,Math.PI/2+(2*Math.atan(width/(2*((width/2)-cin)))));
   	else              ctx2.arc(width,cin,cin-width/2,(3*Math.PI/2)-(2*Math.atan(width/(2*(cin-width/2)))),3*Math.PI/2);
    ctx2.stroke(); 
    ctx2.restore();

}



function showCoords(event) {

    var xm = event.clientX-10;      // 10 is to offset mouse length
    var ym = event.clientY-16;
    var rval = xy2r(xm,ym);
    var ival = xy2i(xm,ym);
    document.getElementById("rval").innerHTML = rval;
    document.getElementById("ival").innerHTML = ival;
}

function clearCoor() {
    document.getElementById("rval").innerHTML = "-";
    document.getElementById("ival").innerHTML = "-";
}

function xy2r(x,y){
	    x = x/(width/2)-1;y=1-y/(height/2);
        return (2*(1-x)/(Math.pow(x-1,2)+Math.pow(y,2))-1).toFixed(3);

}
function xy2i(x,y){
	    x = x/(width/2)-1;y=1-y/(height/2);
        return (2*y/(Math.pow(x-1,2)+Math.pow(y,2))).toFixed(3);	
}

function ir2x(rval,ival){
	return (1-(2/((rval+1)*(1+(Math.pow(ival,2)/Math.pow(rval+1,2))))));
}

function ir2y(rval,ival){

	return (ival*(2/((rval+1)*(1+(Math.pow(ival,2)/Math.pow(rval+1,2)))))/(rval+1));
}