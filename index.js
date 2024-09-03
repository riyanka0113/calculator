$(document).ready(function() {
    //Adding to the expression
    $(".design").click(function() {
        if (!$(this).hasClass("not")) {
            if ($("#expression").val() == 0)
                $("#expression").val($(this).text());
            
            else
                $("#expression").val($("#expression").val() + $(this).text());
        }
    });

    //Backspace
    $('#backspace').click(function() {
        var value = $("#expression").val();
        if (!(parseInt(parseFloat(value)) == 0 && value.length == 1))
            $("#expression").val(value.slice(0, value.length - 1));
        if (value.length == 1)
            $("#expression").val("0");
    });
});

//display sqrt
    var num;
    $("#sqrt").click(function() {
    num = $("#expression").val();
    if(num[1]=='('){
        num = num.slice(3,5);
    }
    $("#expression").val("√("+num+")");    
    });

//display inverse
    $("#inverse").click(function(){
        num = $("#expression").val();
        $("#expression").val("1/("+num+")");
    })

// All Clear
$("#allClear").click(function() {
    $("#expression").val("0");
    $("#result").val("0");
});

//Evalution
$("#equals").click(function() {
     
    var result;
    var val = $("#expression").val();
    var len = val.length;

    //display percentage
    if(val[len-1] =='%'){
        var index = val.indexOf('*');
        var div = parseInt(val.slice(index+2,len-1))/100;
        $("#expression").val(val.slice(0,index-1)+ div);
        val = val.slice(0,index+1) + div;
    }
       
    index = val.indexOf('^');
    //calculate power
    if(val[index] =='^'){
        num1 = parseInt(val.slice(0,index));
        num2 = parseInt(val.slice(index+1,len));    
        result = Math.pow(num1,num2);
    }

    //calculate square root
    else if(val[0] =='√'){
        result = Math.sqrt(num);
    }

    //Check for syntax error
    else{
        try {
            result = (eval(val));
        } catch (e) {
            if (e instanceof SyntaxError) {
                alert("Error! Resetting values.");
                $("#expression").val("0");
                $("#result").val("0");
            }
            if (e instanceof TypeError) {
                alert("Error! Resetting values.");
                $("#expression").val("0");
                $("#result").val("0");
            }
        }
    }

    // Append if the result is correct
    $("#result").val(result);
    $("#expression").val("0");
});