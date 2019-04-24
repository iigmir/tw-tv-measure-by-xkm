// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$( document ).ready( () => main() );

function main()
{
    $("#submit-date").click( ()=>
    {
        let input = $(".datepicker-here").val();
        let api = input.replace( /-/g , "" );
        // console.log( api );
    });
}