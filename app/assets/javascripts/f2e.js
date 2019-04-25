// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$( document ).ready( () => main() );

function parse_text( res_data )
{
    function render_tbody({ item })
    {
        let render_thtd = (item_keys_item, item_keys_index) =>
        {   // <th scope="col">${ value0 }</th><td>${ value1 }</td><td>${ value2 }</td>
            let th = `<th scope="row">${ item[item_keys_item] }</th>`;
            let td = `<td>${ item[item_keys_item] }</td>`;
            return item_keys_index === 0 ? th : td;
        };
        let item_keys = Object.keys(item);
        let elem = item_keys.map(
            (item_keys_item, item_keys_index) => render_thtd(item_keys_item, item_keys_index)
        ).join("");
        elem = `<tr>${ elem }</tr>`;
        tbody_data += elem;
        return;
    }
    // Declear vars
    let thead_data = "";
    let tbody_data = "";
    let meta_data = res_data.meta_data;
    let data = res_data.data;
    // Data render
    meta_data.map( m => thead_data += `<th scope="col">${ m }</th>` );
    data.map( item => render_tbody({ item, tbody_data }) );
    thead_data = `<tr>${ thead_data }</tr>`;
    // Put datas
    $("#response-data table thead").append(thead_data);
    $("#response-data table tbody").append(tbody_data);
    // Hidden action
    $("#ajax-error").attr( "hidden", true );
    $("#response-data").attr( "hidden", false );
    return;
}

function error_msg( data )
{
    $("#ajax-error .alert").text( "Data error: " + data.responseJSON.message );
    $("#response-data").attr( "hidden", true );
    $("#ajax-error").attr( "hidden", false );
    console.error( data );
    return;
}

function main()
{
    $("#submit-date").click( ()=>
    {
        let input = $(".datepicker-here").val();
        let url = "/api/" + input.replace( /-/g , "" );
        let ajax = $.ajax({ url });
        ajax.done( data => parse_text(data) );
        ajax.error( data => error_msg(data) );
    });
}