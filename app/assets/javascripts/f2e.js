// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$( document ).ready( () => main() );

function parse_text( data )
{
    console.log( data );
}

function main()
{
    $("#submit-date").click( ()=>
    {
        let input = $(".datepicker-here").val();
        let url = "/api/" + input.replace( /-/g , "" );
        let ajax = $.ajax({ url });
        ajax.done( data => parse_text( data ) );
    });
}