// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$( document ).ready( () => main() );

function main()
{
    console.log("Hello");
    $("h1").addClass("foo");
    $("#ax").html("<p> Hi </p>");
    console.log( $("#ax").html );
}