Date.prototype.addDays = function (days) {
   var date = new Date(this.valueOf());
   date.setDate(date.getDate() + days);
   return date;
}

$(document).ready(function () {
   addFourDayBookingLimit();
   changeListingGridAndList();
   addDefaultShippingPrice();
   changeProfileListingGrid();

   function addDefaultShippingPrice() {
      if ($(".new-listing-form").length) {
         // Listing new/edit page
         setInterval(checkIfFormLoaded, 200);

         function checkIfFormLoaded() {
            if ($("#listing_title").length > 0) {
               addShippingPrice();
            }
         }

         function addShippingPrice() {
            $(".delivery-options-container #listing_shipping_price").val('14.95');
            $("label[for='shipping-checkbox']").html("Shipping ($14.95 flat rate)");
            $(".shipping-price-container").insertBefore($("#listing_price"));
         }

         setInterval(function () {
            $("#image-uploader-container").prevAll(".info-text-container").first().find(".info-text-content").html("<p>We find your items look their best when it’s a portrait image and you can see the whole garment from head to toe.</p>");
         }, 200);
      }
   }

   function changeProfileListingGrid() {
      $("#profile-listings-list .people-fluid-thumbnail-grid-item").each(function (index) {
         if (!$(this).hasClass("customized")) {
            var imageField = $(this).find(".fluid-thumbnail-grid-image-image")
            var thumbnailURL = imageField.attr("src");
            imageField.attr("src", thumbnailURL.replace('/medium/', '/original/'));

            var priceContainer = $(this).find(".fluid-thumbnail-grid-image-price-container");
            if (priceContainer.find(".fluid-thumbnail-grid-image-quantity").length == 0 && priceContainer.html().indexOf("$") >= 0) {
               $('<span class="fluid-thumbnail-grid-image-quantity" title=" / sale"> / sale</span>').insertAfter(priceContainer.find(".fluid-thumbnail-grid-image-price"))
            }
            ;
            $(this).addClass("customized");
         }
      });
   }

   function changeListingGridAndList() {
      $(".home-fluid-thumbnail-grid-item").each(function (index) {
         if (!$(this).hasClass("customized")) {
            var imageField = $(this).find(".fluid-thumbnail-grid-image-image")
            var thumbnailURL = imageField.attr("src");
            imageField.attr("src", thumbnailURL.replace('/medium/', '/original/'));

            var priceContainer = $(this).find(".fluid-thumbnail-grid-image-price-container");
            if (priceContainer.find(".fluid-thumbnail-grid-image-quantity").length == 0 && priceContainer.html().indexOf("$") >= 0) {
               $('<span class="fluid-thumbnail-grid-image-quantity" title=" / sale"> / sale</span>').insertAfter(priceContainer.find(".fluid-thumbnail-grid-image-price"))
            }
            ;
            $(this).addClass("customized");
         }
      });

      $(".home-list-item").each(function (index) {
         if (!$(this).hasClass("customized")) {
            var imageField = $(this).find(".home-list-image")
            var thumbnailURL = imageField.attr("src");
            imageField.attr("src", thumbnailURL.replace('/small_3x2/', '/big/'));
            var priceContainer = $(this).find(".home-list-price");
            if (priceContainer.find(".home-list-price-quantity").length == 0 && priceContainer.html().indexOf("$") >= 0) {
               $('<span class="home-list-price-quantity" title=" / sale">Sale</span>').insertAfter(priceContainer.find(".home-list-item-price-value"))
            }
            ;

            var priceContainer = $(this).find(".home-list-price-mobile");
            if (priceContainer.find(".home-list-price-quantity").length == 0 && priceContainer.html().indexOf("$") >= 0) {
               $('<span class="home-list-price-quantity" title=" / sale">Sale</span>').insertAfter(priceContainer.find(".home-list-price-value-mobile"))
            }
            ;

            $(this).addClass("customized");
         }
      });
   }

   function addFourDayBookingLimit() {
      if ($("#booking-dates").length) {

         if ($(".listing-price-quantity").text().indexOf("per day") >= 0 || $(".listing-price-quantity").text().indexOf("per night") >= 0) {
            $(".listing-price-quantity").text("per day – 4 day min")
         }

         $("#start-on").change(function () {
            var selectedDate = new Date($(this).val());
            var minDate = selectedDate.addDays(3);
            var endDate = new Date($("#end-on").val());
            if (endDate && endDate < minDate) {
               $("#end-on").datepicker('setDate', minDate);
            }
         });

         $("#end-on").change(function (e) {
            var selectedDate = new Date($(this).val());
            var fromDate = new Date($("#start-on").val());
            var minDate = fromDate.addDays(3);

            if (selectedDate < minDate) {
               $("#end-on").datepicker('setDate', minDate);
            }
         });

         function formatDate(date) {
            var dd = date.getDate();
            var mm = date.getMonth() + 1;
            var yyyy = date.getFullYear();
            if (dd < 10) {
               dd = '0' + dd;
            }

            if (mm < 10) {
               mm = '0' + mm;
            }
            return (mm + "/" + dd + "/" + yyyy)
         }

      }
   }
});
