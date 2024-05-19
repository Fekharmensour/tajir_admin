const root = {
  "dark-color" : "#001C30"  , // dark color for the background of the app
  "second-color" :"#176B87" ,
  "therd-color" : "#FB923C" ,
  "light-color" : "#FFF7EB" ,
  "five-color": "#FFBB5C" ,
  "Six-Color": "#7C2D12" ,
}
export const data_Pei = [
  ["Category", "Percentage"],
  ["Bag", 49],     
  ["Laptop", 35],    
  ["Shose", 16],    
  ["Phone", 16],     
];

export const options_Pei = {
  is3D: true,
  colors: [root["Six-Color"],root["therd-color"] , root["five-color"] , root["light-color"] ],
  legend: { position: "bottom" },
};



export const data_bar = [
    ["Month", "Added To Cart", "Ordered" ],
    ["March", 1000, 200 ],
    ["Mai", 1200, 500,],
    ["Avril", 1460, 740 ],
    ["Avril", 860, 540  ],
    ["Avril", 2260, 1240  ],
    ["Avril", 1660, 840  ],
  ];
  
  export const options_bar = {
    chart: {
      title: "Company Performance",
      subtitle: "Sales, Expenses, and Profit: 2014-2017",
    },
    colors: [ root["therd-color"], root["Six-Color"]] ,
    hAxis: {
      title: "Month",
    },
  };

  export const topSellersData = [
    ["Top" ,"Name", "Rating Of 05"  ],
    [ 1,"MensourFEKHAR . Chardaia",  4.8  ],
    [ 2,"OussanaKhobzi . Ghardia",  4.7 ],
    [ 3,"IleysFertas . Constantine", 4.5 ],
    [ 4,"YacineZitani . Constantine", 4.3 ],
    [ 5,"LokmaneTelay  . Constantine", 4.1 ],
  ];

  // Google Chart options
  export const chartOptions = {
    title: "Top Sellers",
    legend: "none",
    colors: ["blue"],
    hAxis: {
      title: "Rating",
    },
  };
 
  export const data_Gei = [
    ["Country", "Popularity"],
    ["Germany", 200],
    ["United States", 300],
    ["Brazil", 400],
    ["Canada", 500],
    ["France", 600],
    ["RU", 700],
  ];
 export const options_Gei = {
    colorAxis: { colors: [root['dark-color'], root["Six-Color"], root["therd-color"] , root["five-color"]] }, // Custom colors for regions
  };

  export const data_area = [
    ["Year", "Buyer", "Seller"],
    ["2020", 800, 243],
    ["2021", 1170, 255],
    ["2022", 1500, 378],
    ["2023", 1789, 544],
  ];
  export const options_area = {
    vAxis: { minValue: 0 },
    chartArea: { width: "50%", height: "70%" },
    colors: [ root["therd-color"] , root["Six-Color"]]
  };