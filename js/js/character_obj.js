function character_viewModel(character_obj)
{
    var self = this;    
    ko.mapping.fromJS(character_obj, {}, self);

    self.selected = ko.observable(false);

    self.character_detail = ko.observableArray();
    self.items = ko.observableArray();
    self.weapons = ko.observableArray();
    self.armor = ko.observableArray();
    self.skills = ko.observableArray();
    self.char_attributes = ko.observableArray();
    self.car_class = ko.observableArray();
    self.spells = ko.observableArray();
    self.feats = ko.observableArray();
    self.loaded = ko.observable(false)

    socket.on("got_character_details"+self.pk(), function(data) {
        self.get_details_success(data)
    })

    socket.on("got_character_skills"+self.pk(), function(data) {
        self.get_skills_success(data)
    })

    socket.on("got_character_attributes"+self.pk(), function(data) {
        self.get_attributes_success(data)
        self.get_every_thing_else()
    })

    socket.on("got_character_items"+self.pk(), function(data) {
        self.get_items_success(data)
    })

    socket.on("got_character_weapons"+self.pk(), function(data) {
        self.get_weapons_success(data)
    })

    socket.on("got_character_armor"+self.pk(), function(data) {
        self.get_armor_success(data)
    })

    socket.on("got_character_spells"+self.pk(), function(data) {
        self.get_spells_success(data)
    })

    socket.on("got_character_feats"+self.pk(), function(data) {
        self.get_feats_success(data)
    })


    self.select = function()
    {
        self.selected(true);
        if (!self.loaded())
        {
            socket.emit("get_character_details", self.pk());
            socket.emit("get_character_attributes", self.pk());
            self.loaded(true);
        }
    }

    self.get_every_thing_else = function()
    {
        socket.emit("get_character_skills", self.pk());
        socket.emit("get_character_items", self.pk());
        socket.emit("get_character_weapons", self.pk());
        socket.emit("get_character_armor", self.pk());
        socket.emit("get_character_spells", self.pk());
        socket.emit("get_character_feats", self.pk());
    }

    self.get_details = function()
    {
        if (self.character_detail().length == 0)
            socket.emit("get_character_details", self.pk());
    }

    self.get_details_success = function(data)
    {
        data = JSON.parse(data);
        if(self.pk() == data[0]["character"])
        {
            temp_array = [];
            for (var i = 0, i_len = data.length; i < i_len; ++i)
            {
                temp_array.push(new character_details_viewModel(data[i]));
            }
            self.character_detail(temp_array);
        }
    }

    self.get_skills = function()
    {   
        if (self.skills().length == 0)
        {
            socket.emit("get_character_skills", self.pk());
        }
    }

    self.get_skills_success = function(data)
    {
        data = JSON.parse(data);
        if(self.pk() == data[0]["character"])
        {
            temp_array = [];
            for (var i = 0, i_len = data.length; i < i_len; ++i)
            {
                temp_array.push(new character_skill_viewModel(data[i],self.char_attributes()));
            }
            self.skills(temp_array);
        }
    }

    self.get_items_success = function(data)
    {
        data = JSON.parse(data);
        if(self.pk() == data[0]["character"])
        {
            temp_array = [];
            for (var i = 0, i_len = data.length; i < i_len; ++i)
            {
                self.items.push(new character_item_viewModel(data[i]));
            }
        }
    }

    self.get_attributes_success = function(data)
    {
        data = JSON.parse(data);
        if(self.pk() == data[0]["character"])
        {
            temp_array = [];
            for (var i = 0, i_len = data.length; i < i_len; ++i)
            {
                temp_array.push(new character_attribute_viewModel(data[i]));
            }
            self.char_attributes(temp_array);
        }
    }

    self.get_weapons_success = function(data)
    {
        data = JSON.parse(data);
        if(self.pk() == data[0]["character"])
        {
            temp_array = [];
            for (var i = 0, i_len = data.length; i < i_len; ++i)
            {
                temp_array.push(new character_weapon_viewModel(data[i]));
                self.items.push(new character_item_viewModel({'character':self.pk(),'amount':1,'item':data[i]['weapon']['item']}));
            }
            self.weapons(temp_array);
        }
    }

    self.get_armor_success = function(data)
    {
        data = JSON.parse(data);
        if(self.pk() == data[0]["character"])
        {
            temp_array = [];
            for (var i = 0, i_len = data.length; i < i_len; ++i)
            {
                temp_array.push(new character_armor_viewModel(data[i]));
                self.items.push(new character_item_viewModel({'character':self.pk(),'amount':1,'item':data[i]['armor']['item']}));
            }
            self.armor(temp_array);
        }
    }

    self.get_feats_success = function(data)
    {
        data = JSON.parse(data);
        if(self.pk() == data[0]["character"])
        {
            temp_array = [];
            for (var i = 0, i_len = data.length; i < i_len; ++i)
            {
                temp_array.push(new character_feat_viewModel(data[i]));
            }
            self.feats(temp_array);
        }
    }

    self.get_spells_success = function(data)
    {
        data = JSON.parse(data);
        if(self.pk() == data[0]["character"])
        {
            temp_array = [];
            for (var i = 0, i_len = data.length; i < i_len; ++i)
            {
                temp_array.push(new character_spell_viewModel(data[i]));
            }
            self.spells(temp_array);
        }
    }
}