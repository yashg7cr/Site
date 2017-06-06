exGSP = window.exGSP || {};
exGSP.service('store', function () {
    this.items = {},
    this.length = 0,
    this.setItem = function (key, value) {
        var previous = undefined;
        if (this.hasItem(key)) {
            previous = this.items[key];
        }
        else {
            this.length++;
        }
        this.items[key] = value;
        return previous;
    },
     this.getItem = function (key) {
         return this.hasItem(key) ? this.items[key] : undefined;
     },
     this.hasItem = function (key) {
         return this.items.hasOwnProperty(key);
     },
     this.removeItem = function (key) {
         if (this.hasItem(key)) {
             previous = this.items[key];
             this.length--;
             delete this.items[key];
             return previous;
         }
         else {
             return undefined;
         }
     },
     this.clear = function () {
         this.items = {}
         this.length = 0;
     }

});
