'use strict';

const
    property = {
        cssStart: {
            opacity: 1,
            top: '0%',
            left: '0%',
            width: '100%',
            height: '100%',
            'background-color': 'white'
        },
        cssEnd: {
            opacity: 0,
            top: '50%',
            left: '50%',
            width: '0%',
            height: '0%'
        },
        js: {
            duration: 400,
            easing: 'linear',
            complete: strobe
        }
    };

function reset() {
    $( '.strobe' ).css( property.cssStart );
}

function strobe() {
    reset();
    $( '.strobe' ).animate( property.cssEnd, property.js );
}

$( document ).ready( () => {
    strobe();

    const settings = $( '.settings-bar' );

    $( '.settings-button' ).click( () => {
        if( settings.hasClass( 'show' ) )
            settings.animate( {
                top: 0,
                left: '-5rem'
            } );
        else
            settings.animate( {
                top: 0,
                left: 0
            } );

        settings.toggleClass( 'show' );
    } );

    $( '#cp' ).ColorPicker( {
        flat: true,
        color: '#FFFFFF',
        onShow: function( colpkr ) {
            $( colpkr ).fadeIn( 500 );
            return false;
        },
        onHide: function( colpkr ) {
            $( colpkr ).fadeOut( 500 );
            return false;
        },
        onChange: function( hsb, hex, rgb ) {
            property.cssStart[ 'background-color' ] = hex;
        }
    } );

    $( '#bcp' ).ColorPicker( {
        flat: true,
        color: '#000000',
        onShow: function( colpkr ) {
            $( colpkr ).fadeIn( 500 );
            return false;
        },
        onHide: function( colpkr ) {
            $( colpkr ).fadeOut( 500 );
            return false;
        },
        onChange: function( hsb, hex, rgb ) {
            $( '.ui-panel-wrapper' ).css( 'backgroundColor', '#' + hex, 'important' );
        }
    } );

    $( '.ui-panel-wrapper' ).css( 'backgroundColor', '#000000', 'important' );

    $( '.ui-slider-input#speed' )
        .change( function() {
            property.js.duration = 2000 * ( $( this ).val() / 100 );
        } );

    $( '.ui-slider-input#aalpha' )
        .change( function() {
            property.cssStart.opacity = ( $( this ).val() / 100 );
        } );

    $( '.ui-slider-input#oalpha' )
        .change( function() {
            property.cssEnd.opacity = ( $( this ).val() / 100 );
        } );
} );
