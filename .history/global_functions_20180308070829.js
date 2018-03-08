const toRoomModel = function(rows) {
    let newArray;
      function compare(a, b) {
            if (a.bedNum < b.bedNum)
                  return -1;
            if (a.bedNum > b.bedNum)
                  return 1;
            return 0;
      }
      let colorCount = 1
      for (var i = 0; i < rows.length; i++) {
            let bedsNumArray = rows[i].bedArray.split(',');
            let bedsAvailableArray = rows[i].availableArray.split(',');
            let bedsIdArray = rows[i].bedIdArray.split(',');
            console.log(bedsNumArray);
            console.log(bedsAvailableArray);
            var room = { room_id: rows[i].room_id, name: rows[i].room_name, room_color: 'room' + colorCount, category: rows[i].category_name, description: rows[i].descText, beds: [] };
            if (colorCount === 5) colorCount = 0;
            colorCount++;
            for (var z = 0; z < bedsNumArray.length; z++) {
                  let obj = { bed_id: bedsIdArray[z], bedNum: bedsNumArray[z], isAvailable: bedsAvailableArray[z] };
                  room.beds.push(obj);
            };
            console.log(room);
            room.beds.sort(compare);
            newArray.push(room);
      }
      return newArray;
}