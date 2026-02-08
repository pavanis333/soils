// Soils of India - Comprehensive Data from PDF Pages 48-49
// Source: PNP 2026 PRELIMS NAVIGATOR PROGRAM - Geography (Indian Geography)

export const soilTypes = [
  {
    id: 1,
    name: "Alluvial Soil",
    coverage: ">40% of Indian area (most common)",
    distribution: [
      "Northern Plains",
      "Coastal Plains"
    ],
    types: [
      {
        name: "Bhangar",
        description: "Less fertile older alluvium"
      },
      {
        name: "Khadar",
        description: "More fertile newer alluvium"
      }
    ],
    richIn: ["Potash", "Lime", "Phosphoric acid"],
    poorIn: ["Nitrogen", "Humus"],
    suitableCrops: ["Sugarcane", "Paddy", "Wheat", "Other cereal and pulse crops"],
    characteristics: [
      "Most common soil of India covering >40% area",
      "Found in Northern Plains and Coastal Plains",
      "Two types: Bhangar (older, less fertile) and Khadar (newer, more fertile)",
      "Ideal for cereals and pulses"
    ],
    importance: "HIGH"
  },
  {
    id: 2,
    name: "Black Soil (Regur)",
    coverage: "3rd most common soil of India",
    distribution: [
      "Plateaus of Maharashtra",
      "Saurashtra",
      "Madhya Pradesh",
      "Chhattisgarh",
      "Southeast along Godavari and Krishna valleys"
    ],
    richIn: ["Magnesium", "Potash", "Iron", "Lime", "Alumina"],
    poorIn: ["Phosphoric contents", "Nitrogen", "Organic matter"],
    specialFeatures: [
      "Self-ploughing ability: Develops cracks when dry",
      "High water retention - ideal for rain-fed agriculture"
    ],
    suitableCrops: ["Cotton (primary)", "Sugarcane", "Pulses"],
    nickname: "Cotton soil",
    characteristics: [
      "3rd common soil of India",
      "Develops cracks when dry giving self-ploughing ability",
      "High water retention makes it ideal for rain-fed agriculture",
      "Very ideal for cotton growth, called Cotton soil"
    ],
    importance: "HIGH"
  },
  {
    id: 3,
    name: "Red and Yellow Soil",
    formation: "Develops on crystalline igneous rocks, rich in Iron (red hue)",
    colorVariation: "Becomes yellow when iron occurs in hydrated form",
    distribution: [
      "Red: Areas of low rainfall in eastern and southern parts of Deccan Plateau",
      "Red: Along Piedmont zone of Western Ghats",
      "Yellow: Parts of Odisha and Chhattisgarh"
    ],
    richIn: ["Iron", "Potash"],
    poorIn: ["Nitrogen", "Phosphorous", "Humus"],
    fertility: "Fertile if fine-grained",
    suitableCrops: ["Wheat", "Cotton", "Pulses", "Tobacco", "Oilseeds", "Potato"],
    characteristics: [
      "Develops on crystalline igneous rocks",
      "Red color due to iron content",
      "Becomes yellow when iron is in hydrated form",
      "Found in low rainfall areas of Deccan Plateau",
      "Fertile if fine-grained"
    ],
    importance: "HIGH"
  },
  {
    id: 4,
    name: "Laterite Soil",
    formation: "In wetter margins, red soil converts into Laterite soil",
    nature: "Acidic soil, unsuitable for cultivation",
    richIn: ["Iron oxide (excess)", "Potash (excess)"],
    poorIn: ["Organic matter", "Nitrogen", "Phosphate", "Calcium"],
    distribution: [
      "Southern states",
      "Western Ghats region of Maharashtra",
      "Odisha",
      "Some parts of West Bengal",
      "North-east regions"
    ],
    suitableCrops: ["Tea", "Coffee", "Cashew"],
    characteristics: [
      "Forms in wetter margins from red soil",
      "Acidic in nature making it unsuitable for most cultivation",
      "Poor in nutrients but rich in iron oxide",
      "Suitable only for plantation crops like tea, coffee, cashew"
    ],
    importance: "MEDIUM"
  },
  {
    id: 5,
    name: "Arid/Desert Soil",
    texture: "Sandy and Saline",
    characteristics: [
      "Lack of moisture, Humus, and Nitrogen",
      "Phosphorous is adequate",
      "Includes Calcium Kankar nodules which reach topsoil by capillary action",
      "Can be cultivated if irrigation is available"
    ],
    distribution: [
      "Rajasthan",
      "In and around Thar desert"
    ],
    suitableCrops: ["Millets", "Fodder crops", "Some beans (Guar Beans)", "Wheat (if irrigated)"],
    specialNote: "Indira Gandhi Canal project has helped cultivate these soils",
    richIn: ["Phosphorous (adequate)"],
    poorIn: ["Moisture", "Humus", "Nitrogen"],
    specialFeature: "Calcium Kankar nodules",
    importance: "MEDIUM"
  },
  {
    id: 6,
    name: "Saline Soil (Usara)",
    nickname: "Usara soil",
    nature: "Infertile with large proportion of salts",
    salts: ["Sodium", "Potassium", "Magnesium"],
    distribution: [
      "Arid and semi-arid parts of Rajasthan",
      "Punjab",
      "Uttar Pradesh",
      "Haryana",
      "Gujarat (Kachchh)",
      "Maharashtra"
    ],
    suitableCrops: ["Coconuts (in some parts)", "Salt resistant fodder crops"],
    specialNote: "White Revolution Impact - some salt resistant crops being grown",
    characteristics: [
      "Also called Usara soil",
      "Infertile with large proportion of salts",
      "Found in arid and semi-arid regions",
      "Only salt-resistant crops can be grown"
    ],
    importance: "LOW"
  },
  {
    id: 7,
    name: "Peaty/Marshy Soil",
    occurrence: "Areas of heavy rainfall and high humidity",
    richIn: ["Humus (organic content 40-50%)"],
    specialFeature: "Organic content may go up to 40-50 percent",
    cultivation: "If properly drained and fertilized, can be used for rice",
    distribution: [
      "Odisha",
      "Sundarbans in West Bengal",
      "Parts of Bihar",
      "Uttar Pradesh",
      "Parts of Kerala"
    ],
    suitableCrops: ["Rice (if properly drained and fertilized)"],
    characteristics: [
      "Found in heavy rainfall and high humidity areas",
      "Very rich in humus (40-50% organic content)",
      "Needs proper drainage and fertilization for cultivation",
      "Suitable for rice when treated"
    ],
    importance: "MEDIUM"
  },
  {
    id: 8,
    name: "Forest and Mountain Soil",
    occurrence: "Forest areas with adequate rainfall",
    distribution: [
      "Forest regions of Himalayas",
      "Western Ghats",
      "Eastern Ghats"
    ],
    variation: "Vary in structure and texture depending on mountain environment",
    types: [
      {
        location: "Valley sides",
        texture: "Loamy and silty",
        suitableCrops: ["Rice", "Wheat"]
      },
      {
        location: "Upper slopes",
        texture: "Coarse-grained",
        suitableCrops: ["Horticulture"]
      }
    ],
    characteristics: [
      "Found in forest areas with adequate rainfall",
      "Structure varies with mountain environment",
      "Valley sides: loamy and silty (rice and wheat)",
      "Upper slopes: coarse-grained (horticulture)"
    ],
    importance: "MEDIUM"
  }
];

// Key Facts about Indian Soils
export const soilFacts = [
  {
    fact: "Indian Council of Agriculture Research defines 8 types of soils in India",
    category: "Classification"
  },
  {
    fact: "Alluvial soil is the most common, covering >40% of Indian area",
    category: "Coverage"
  },
  {
    fact: "Black soil is the 3rd most common soil in India",
    category: "Coverage"
  },
  {
    fact: "Bhangar: Less fertile older alluvium; Khadar: More fertile newer alluvium",
    category: "Alluvial Types"
  },
  {
    fact: "Black soil develops self-ploughing ability through cracks when dry",
    category: "Special Features"
  },
  {
    fact: "Black soil also called Cotton soil due to ideal conditions for cotton",
    category: "Nicknames"
  },
  {
    fact: "Red soil becomes yellow when iron occurs in hydrated form",
    category: "Color Variation"
  },
  {
    fact: "Laterite soil is acidic and unsuitable for cultivation except plantation crops",
    category: "Soil Nature"
  },
  {
    fact: "Arid soil contains Calcium Kankar nodules that reach topsoil by capillary action",
    category: "Special Features"
  },
  {
    fact: "Indira Gandhi Canal project helped cultivate arid soils in Rajasthan",
    category: "Development"
  },
  {
    fact: "Saline soil also called Usara soil",
    category: "Nicknames"
  },
  {
    fact: "White Revolution Impact: Salt resistant crops being grown in saline soils",
    category: "Development"
  },
  {
    fact: "Peaty/Marshy soil can have 40-50% organic content",
    category: "Composition"
  },
  {
    fact: "Forest & Mountain soil texture varies: Valley sides (loamy/silty), Upper slopes (coarse-grained)",
    category: "Variation"
  }
];

// Quiz Questions - 40 comprehensive UPSC-style questions
export const quizQuestions = [
  // Alluvial Soil (8 questions)
  {
    question: "Which soil type covers the largest area in India?",
    options: ["Black soil", "Red soil", "Alluvial soil (>40%)", "Laterite soil"],
    correct: 2,
    explanation: "Alluvial soil is the most common soil of India, covering more than 40% of Indian area."
  },
  {
    question: "Where is Alluvial soil primarily found?",
    options: ["Deccan Plateau", "Northern Plains and Coastal Plains", "Thar Desert", "Western Ghats"],
    correct: 1,
    explanation: "Alluvial soil is found in Northern Plains and Coastal Plains of India."
  },
  {
    question: "What is Bhangar in context of Alluvial soil?",
    options: ["More fertile newer alluvium", "Less fertile older alluvium", "A type of black soil", "Coastal alluvium"],
    correct: 1,
    explanation: "Bhangar is the less fertile older alluvium, while Khadar is the more fertile newer alluvium."
  },
  {
    question: "What is Khadar?",
    options: ["Less fertile older alluvium", "More fertile newer alluvium", "Saline soil", "Mountain soil"],
    correct: 1,
    explanation: "Khadar is the more fertile newer alluvium found in alluvial soil regions."
  },
  {
    question: "Alluvial soil is rich in which nutrients?",
    options: ["Nitrogen and Humus", "Potash, Lime, and Phosphoric acid", "Iron and Magnesium", "Organic matter"],
    correct: 1,
    explanation: "Alluvial soil is rich in Potash, Lime, and Phosphoric acid, but poor in Nitrogen and Humus."
  },
  {
    question: "Which crops are ideal for Alluvial soil?",
    options: ["Tea and Coffee", "Cotton only", "Sugarcane, Paddy, Wheat, cereals and pulses", "Only millets"],
    correct: 2,
    explanation: "Alluvial soil is ideal for sugarcane, paddy, wheat, and other cereal and pulse crops."
  },
  {
    question: "What is Alluvial soil poor in?",
    options: ["Potash and Lime", "Nitrogen and Humus", "Phosphoric acid", "All nutrients"],
    correct: 1,
    explanation: "Despite being nutrient-rich, Alluvial soil is poor in Nitrogen and Humus."
  },
  {
    question: "Which type of alluvium is more fertile?",
    options: ["Bhangar", "Khadar", "Both equally fertile", "Neither is fertile"],
    correct: 1,
    explanation: "Khadar (newer alluvium) is more fertile than Bhangar (older alluvium)."
  },
  
  // Black Soil (8 questions)
  {
    question: "What is Black soil also called?",
    options: ["Usara", "Regur", "Laterite", "Bhangar"],
    correct: 1,
    explanation: "Black soil is also called Regur soil and is the 3rd most common soil in India."
  },
  {
    question: "Why is Black soil called Cotton soil?",
    options: ["It looks like cotton", "It's white in color", "Very ideal for cotton growth", "It's soft textured"],
    correct: 2,
    explanation: "Black soil is often called Cotton soil because it is very ideal for the growth of cotton."
  },
  {
    question: "What unique ability does Black soil have when it dries?",
    options: ["Becomes very hard", "Develops cracks giving self-ploughing ability", "Changes color", "Loses all nutrients"],
    correct: 1,
    explanation: "When dry, Black soil develops cracks which gives it self-ploughing ability."
  },
  {
    question: "Which property makes Black soil ideal for rain-fed agriculture?",
    options: ["Low pH", "High water retention", "High porosity", "Low density"],
    correct: 1,
    explanation: "Black soil has high water retention capacity, making it ideal for rain-fed agriculture."
  },
  {
    question: "Black soil is rich in which nutrients?",
    options: ["Nitrogen and organic matter", "Magnesium, Potash, Iron, Lime, Alumina", "Phosphoric acid", "Humus only"],
    correct: 1,
    explanation: "Black soil is rich in Magnesium, Potash, Iron, Lime, and Alumina."
  },
  {
    question: "Where is Black soil primarily found?",
    options: ["Northern Plains", "Plateaus of Maharashtra, Saurashtra, MP, Chhattisgarh; Godavari-Krishna valleys", "Coastal areas", "Himalayan region"],
    correct: 1,
    explanation: "Black soil is found in Plateaus of Maharashtra, Saurashtra, MP, Chhattisgarh, and extends along Godavari and Krishna valleys."
  },
  {
    question: "What is Black soil poor in?",
    options: ["Potash", "Phosphoric contents, Nitrogen, and Organic matter", "Iron", "Lime"],
    correct: 1,
    explanation: "Black soil is poor in Phosphoric contents, Nitrogen, and Organic matter despite being rich in other minerals."
  },
  {
    question: "Which ranking does Black soil hold in India by commonality?",
    options: ["Most common", "2nd common", "3rd common", "4th common"],
    correct: 2,
    explanation: "Black soil is the 3rd most common soil of India after Alluvial and Red soils."
  },
  
  // Red and Yellow Soil (6 questions)
  {
    question: "Red soil develops on which type of rocks?",
    options: ["Sedimentary rocks", "Crystalline igneous rocks", "Metamorphic rocks", "Limestone"],
    correct: 1,
    explanation: "Red soil develops on crystalline igneous rocks and is rich in Iron, giving it a red hue."
  },
  {
    question: "Why does Red soil become Yellow?",
    options: ["Due to sunlight", "When iron occurs in hydrated form", "Due to water logging", "Due to crop cultivation"],
    correct: 1,
    explanation: "Red soil becomes yellow when iron occurs in hydrated form instead of oxidized form."
  },
  {
    question: "Where is Red soil primarily found?",
    options: ["Northern Plains", "Low rainfall areas of eastern and southern Deccan Plateau; Piedmont zone of W.Ghats", "Coastal areas only", "Himalayan region"],
    correct: 1,
    explanation: "Red soil is found in areas of low rainfall in eastern and southern parts of Deccan Plateau and along Piedmont zone of Western Ghats."
  },
  {
    question: "Where is Yellow soil found?",
    options: ["Parts of Odisha and Chhattisgarh", "Kerala", "Punjab", "Assam"],
    correct: 0,
    explanation: "Yellow soil (hydrated form of red soil) is found in parts of Odisha and Chhattisgarh."
  },
  {
    question: "When is Red soil fertile?",
    options: ["Always fertile", "If fine-grained", "Never fertile", "Only with irrigation"],
    correct: 1,
    explanation: "Red soil is fertile if it is fine-grained in texture."
  },
  {
    question: "Which crops are suitable for Red and Yellow soil?",
    options: ["Only cotton", "Wheat, Cotton, Pulses, Tobacco, Oilseeds, Potato", "Only rice", "Tea and Coffee"],
    correct: 1,
    explanation: "Red and Yellow soil supports Wheat, Cotton, Pulses, Tobacco, Oilseeds, and Potato."
  },
  
  // Laterite Soil (5 questions)
  {
    question: "How does Laterite soil form?",
    options: ["From igneous rocks", "In wetter margins, red soil converts to Laterite", "From black soil", "From alluvial deposits"],
    correct: 1,
    explanation: "In the wetter margins, the red soil converts into Laterite soil."
  },
  {
    question: "What is the nature of Laterite soil?",
    options: ["Alkaline", "Acidic, unsuitable for cultivation", "Neutral", "Highly fertile"],
    correct: 1,
    explanation: "Laterite soil is acidic in nature, making it unsuitable for cultivation of most crops."
  },
  {
    question: "Which crops can be grown in Laterite soil?",
    options: ["Wheat and Rice", "Tea, Coffee, Cashew", "Cotton and Sugarcane", "All cereals"],
    correct: 1,
    explanation: "Despite being acidic and unsuitable for most crops, Laterite soil can grow Tea, Coffee, and Cashew."
  },
  {
    question: "Where is Laterite soil found?",
    options: ["Northern Plains", "Southern states, W.Ghats region of Maharashtra, Odisha, parts of WB, NE regions", "Punjab and Haryana", "Rajasthan"],
    correct: 1,
    explanation: "Laterite soil is found in Southern states, Western Ghats region of Maharashtra, Odisha, some parts of West Bengal, and North-east regions."
  },
  {
    question: "What is Laterite soil rich in?",
    options: ["Nitrogen and Phosphate", "Iron oxide and Potash (excess)", "Organic matter", "Calcium"],
    correct: 1,
    explanation: "Laterite soil is rich in iron oxide and potash (in excess), but poor in most other nutrients."
  },
  
  // Arid/Desert Soil (5 questions)
  {
    question: "What is the texture of Arid soil?",
    options: ["Clayey", "Sandy and Saline", "Loamy", "Silty"],
    correct: 1,
    explanation: "Arid soil has sandy and saline texture."
  },
  {
    question: "What are Calcium Kankar nodules?",
    options: ["Plant roots", "Nodules that reach topsoil by capillary action", "Animal deposits", "Rock fragments"],
    correct: 1,
    explanation: "Arid soil includes Calcium Kankar nodules which reach the topsoil layers by the capillary action."
  },
  {
    question: "Which project helped cultivate Arid soils?",
    options: ["Sardar Sarovar Project", "Indira Gandhi Canal project", "Bhakra Nangal Dam", "Tehri Dam"],
    correct: 1,
    explanation: "The Indira Gandhi Canal project has helped cultivate these arid soils in Rajasthan."
  },
  {
    question: "Which nutrient is adequate in Arid soil?",
    options: ["Nitrogen", "Phosphorous", "Humus", "Moisture"],
    correct: 1,
    explanation: "Arid soil lacks moisture, Humus, and Nitrogen, but Phosphorous is adequate."
  },
  {
    question: "Which crops can be grown in Arid soil?",
    options: ["Rice and Wheat", "Millets, Fodder crops, Guar Beans, Wheat (if irrigated)", "Cotton and Sugarcane", "Tea and Coffee"],
    correct: 1,
    explanation: "Arid soil can grow Millets, Fodder crops, some beans (Guar Beans), and Wheat if irrigated."
  },
  
  // Saline Soil (3 questions)
  {
    question: "What is Saline soil also called?",
    options: ["Regur", "Usara", "Laterite", "Peaty"],
    correct: 1,
    explanation: "Saline soil is also called Usara soil."
  },
  {
    question: "Why is Saline soil infertile?",
    options: ["Too dry", "Large proportion of salts (Sodium, Potassium, Magnesium)", "Too acidic", "No minerals"],
    correct: 1,
    explanation: "Saline soil is infertile due to large proportion of salts of Sodium, Potassium, Magnesium, etc."
  },
  {
    question: "Which development impact is mentioned for Saline soil?",
    options: ["Green Revolution", "White Revolution Impact - salt resistant crops", "Blue Revolution", "Yellow Revolution"],
    correct: 1,
    explanation: "White Revolution Impact: In some parts, coconuts and salt resistant fodder crops are being grown in saline soils."
  },
  
  // Peaty/Marshy Soil (3 questions)
  {
    question: "Where does Peaty/Marshy soil occur?",
    options: ["Desert areas", "Areas of heavy rainfall and high humidity", "Mountain peaks", "Dry plateaus"],
    correct: 1,
    explanation: "Peaty/Marshy soil occurs in areas of heavy rainfall and high humidity."
  },
  {
    question: "What is special about Peaty/Marshy soil's organic content?",
    options: ["0-5%", "10-20%", "40-50% (very high)", "60-70%"],
    correct: 2,
    explanation: "Peaty/Marshy soil is very rich in humus, and organic content may go even up to 40-50 percent."
  },
  {
    question: "What treatment does Peaty/Marshy soil need for cultivation?",
    options: ["No treatment needed", "Properly drained and fertilized for rice cultivation", "Only irrigation", "Only fertilization"],
    correct: 1,
    explanation: "If properly drained and fertilized, Peaty/Marshy soil can be used for cultivating crops like rice."
  },
  
  // Forest & Mountain Soil (2 questions)
  {
    question: "What crops are suitable for valley sides in Forest & Mountain soil?",
    options: ["Tea and Coffee", "Rice and Wheat (loamy and silty)", "Cotton", "Only fodder"],
    correct: 1,
    explanation: "Valley sides have loamy and silty soil which can be used to grow rice and wheat."
  },
  {
    question: "What crops are suitable for upper slopes in Forest & Mountain soil?",
    options: ["Rice and Wheat", "Cotton and Sugarcane", "Horticulture (coarse-grained soil)", "Only cereals"],
    correct: 2,
    explanation: "Upper slopes have coarse-grained soil which can be used for Horticulture."
  }
];

export const allQuizQuestions = quizQuestions;

export default {
  soilTypes,
  soilFacts,
  quizQuestions: allQuizQuestions
};
