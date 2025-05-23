// Healthcare Topics Dataset Generator
// This script generates a diverse dataset of 10,000 healthcare topics

// Define core arrays of possible values for each field
const titles = [
  "Managing Type 2 Diabetes",
  "Understanding Blood Pressure Control",
  "Coping with Chronic Pain",
  "Healthy Eating for Heart Disease",
  "Recognizing Depression Symptoms",
  "Living with Asthma",
  "Alzheimer's Disease: Early Signs",
  "Arthritis Pain Management",
  "Preventing Stroke Recurrence",
  "Cancer Screening Guidelines",
  "COPD Management at Home",
  "Anxiety Disorder Basics",
  "Understanding Vaccines",
  "Sleep Apnea Treatments",
  "Digestive Health Basics",
  "Managing Chronic Fatigue",
  "Parkinson's Disease Care",
  "Thyroid Disorder Symptoms",
  "Kidney Disease Diet",
  "Osteoporosis Prevention",
  "Living with Multiple Sclerosis",
  "HIV/AIDS Treatment Today",
  "Preventing Falls in Seniors",
  "Pregnancy Health Basics",
  "Autism Spectrum Awareness",
  "Hepatitis C Treatment Options",
  "Migraine Prevention Strategies",
  "Schizophrenia Treatment Approaches",
  "Concussion Recovery Guidelines",
  "Fibromyalgia Pain Management",
  "Crohn's Disease Diet Tips",
  "Epilepsy First Aid",
  "Psoriasis Treatment Options",
  "Celiac Disease Diet Guide",
  "Lupus Symptoms and Signs",
  "Breast Cancer Awareness",
  "Prostate Health Basics",
  "Prenatal Care Guidelines",
  "Newborn Care Basics",
  "Childhood Immunization Schedule",
  "Adolescent Mental Health",
  "Eating Disorder Warning Signs",
  "Substance Use Disorder Help",
  "Smoking Cessation Methods",
  "Heart Attack Warning Signs",
  "Stroke Symptoms F.A.S.T.",
  "Diabetic Foot Care",
  "Living with Hearing Loss",
  "Vision Problems in Aging",
  "Dental Health Basics"
];

const summaries = [
  "Understand how lifestyle changes can help manage diabetes.",
  "Learn about monitoring blood pressure and medication adherence.",
  "Discover pain management techniques that don't rely on medication.",
  "Find heart-healthy eating patterns that work for you.",
  "Recognize common signs of depression and when to seek help.",
  "Learn to manage asthma triggers and use inhalers correctly.",
  "Identify early warning signs of Alzheimer's disease.",
  "Find relief for arthritis pain through exercise and medication.",
  "Learn lifestyle changes that reduce your risk of another stroke.",
  "Understand recommended cancer screening timelines by age and risk.",
  "Manage COPD symptoms at home with these breathing techniques.",
  "Learn the difference between normal worry and anxiety disorders.",
  "Understand how vaccines work and their importance for public health.",
  "Explore treatment options for sleep apnea beyond CPAP machines.",
  "Improve digestive health with diet and lifestyle changes.",
  "Find ways to manage energy with chronic fatigue syndrome.",
  "Learn caregiving tips for people with Parkinson's disease.",
  "Recognize symptoms that may indicate thyroid problems.",
  "Follow dietary guidelines for kidney health and disease management.",
  "Strengthen bones and prevent fractures with these strategies.",
  "Manage MS symptoms and improve quality of life.",
  "Understand modern HIV treatment and prevention options.",
  "Make home modifications to prevent falls in older adults.",
  "Follow essential health guidelines during pregnancy.",
  "Learn about autism spectrum disorder signs and support.",
  "Explore current hepatitis C treatments and success rates.",
  "Prevent migraines by identifying and avoiding triggers.",
  "Understand medication and therapy options for schizophrenia.",
  "Follow proper recovery protocols after a concussion.",
  "Manage fibromyalgia pain with multimodal approaches.",
  "Find foods that won't trigger Crohn's disease symptoms.",
  "Know what to do when someone has a seizure.",
  "Learn about treatment options for different types of psoriasis.",
  "Follow a gluten-free diet for celiac disease management.",
  "Identify common symptoms of lupus and treatment approaches.",
  "Learn about breast self-exams and mammogram guidelines.",
  "Understand prostate health screening recommendations by age.",
  "Follow prenatal care guidelines for a healthy pregnancy.",
  "Learn essential care for your newborn baby.",
  "Keep track of recommended vaccines for children by age.",
  "Support mental health in teenagers and recognize warning signs.",
  "Identify warning signs of anorexia, bulimia, and binge eating.",
  "Find treatment options for alcohol and drug addiction.",
  "Compare effective methods to quit smoking for good.",
  "Recognize heart attack symptoms that require immediate care.",
  "Remember F.A.S.T. to identify stroke symptoms quickly.",
  "Prevent foot complications with proper diabetic foot care.",
  "Adapt to hearing loss with assistive devices and strategies.",
  "Understand age-related vision changes and treatment options.",
  "Maintain good oral health with proper brushing and flossing."
];

const tagSets = [
  ["diabetes", "lifestyle", "nutrition"],
  ["hypertension", "medication", "monitoring"],
  ["pain management", "chronic pain", "non-medication"],
  ["heart disease", "diet", "nutrition"],
  ["mental health", "depression", "symptoms"],
  ["respiratory", "asthma", "inhalers"],
  ["neurology", "alzheimer's", "memory"],
  ["arthritis", "pain relief", "exercise"],
  ["stroke", "prevention", "cardiovascular"],
  ["cancer", "screening", "prevention"],
  ["COPD", "respiratory", "breathing techniques"],
  ["mental health", "anxiety", "emotional wellness"],
  ["immunization", "vaccines", "preventive care"],
  ["sleep disorders", "sleep apnea", "treatment"],
  ["digestive health", "nutrition", "gut health"],
  ["chronic fatigue", "energy management", "quality of life"],
  ["neurology", "parkinson's", "caregiving"],
  ["endocrine", "thyroid", "hormones"],
  ["kidney disease", "diet", "renal health"],
  ["bone health", "osteoporosis", "fracture prevention"],
  ["multiple sclerosis", "neurology", "symptom management"],
  ["infectious disease", "HIV", "treatment"],
  ["geriatrics", "fall prevention", "safety"],
  ["pregnancy", "prenatal care", "women's health"],
  ["developmental disorders", "autism", "pediatric"],
  ["infectious disease", "hepatitis", "liver health"],
  ["neurology", "migraine", "headache"],
  ["mental health", "schizophrenia", "psychiatric care"],
  ["neurology", "concussion", "brain injury"],
  ["chronic pain", "fibromyalgia", "pain management"],
  ["digestive disorders", "crohn's disease", "diet"],
  ["neurology", "epilepsy", "seizures"],
  ["dermatology", "psoriasis", "skin conditions"],
  ["digestive disorders", "celiac disease", "gluten-free"],
  ["autoimmune", "lupus", "chronic illness"],
  ["women's health", "breast cancer", "screening"],
  ["men's health", "prostate", "screening"],
  ["pregnancy", "prenatal care", "women's health"],
  ["pediatrics", "newborn care", "infant health"],
  ["pediatrics", "immunization", "preventive care"],
  ["mental health", "adolescent", "development"],
  ["mental health", "eating disorders", "nutrition"],
  ["addiction", "substance use", "recovery"],
  ["smoking cessation", "tobacco", "addiction"],
  ["cardiovascular", "heart attack", "emergency"],
  ["stroke", "emergency", "brain health"],
  ["diabetes", "foot care", "complications"],
  ["hearing loss", "audiology", "assistive devices"],
  ["vision", "aging", "eye health"],
  ["dental health", "oral hygiene", "preventive care"]
];

const conditionSets = [
  ["type 2 diabetes"],
  ["hypertension", "high blood pressure"],
  ["chronic pain"],
  ["heart disease", "coronary artery disease"],
  ["depression", "major depressive disorder"],
  ["asthma"],
  ["alzheimer's disease", "dementia"],
  ["arthritis", "osteoarthritis", "rheumatoid arthritis"],
  ["stroke", "cerebrovascular accident"],
  ["cancer", "various types"],
  ["COPD", "emphysema", "chronic bronchitis"],
  ["anxiety disorder", "generalized anxiety disorder"],
  ["preventive care"],
  ["sleep apnea", "obstructive sleep apnea"],
  ["irritable bowel syndrome", "digestive disorders"],
  ["chronic fatigue syndrome", "myalgic encephalomyelitis"],
  ["parkinson's disease"],
  ["hypothyroidism", "hyperthyroidism"],
  ["chronic kidney disease"],
  ["osteoporosis", "osteopenia"],
  ["multiple sclerosis"],
  ["HIV/AIDS"],
  ["fall risk", "geriatric conditions"],
  ["pregnancy"],
  ["autism spectrum disorder"],
  ["hepatitis C"],
  ["migraine", "chronic headache"],
  ["schizophrenia"],
  ["concussion", "traumatic brain injury"],
  ["fibromyalgia"],
  ["crohn's disease", "inflammatory bowel disease"],
  ["epilepsy", "seizure disorders"],
  ["psoriasis", "psoriatic arthritis"],
  ["celiac disease"],
  ["lupus", "systemic lupus erythematosus"],
  ["breast cancer"],
  ["prostate health", "benign prostatic hyperplasia"],
  ["pregnancy", "prenatal care"],
  ["newborn care"],
  ["childhood health", "pediatric care"],
  ["adolescent development", "teen health"],
  ["anorexia", "bulimia", "binge eating disorder"],
  ["substance use disorder", "addiction"],
  ["tobacco use", "nicotine dependence"],
  ["myocardial infarction", "acute coronary syndrome"],
  ["cerebrovascular accident", "brain attack"],
  ["diabetic neuropathy", "peripheral vascular disease"],
  ["hearing impairment", "presbycusis"],
  ["cataracts", "glaucoma", "macular degeneration"],
  ["periodontal disease", "dental caries"]
];

const ageGroups = [
  "infant",
  "child",
  "adolescent",
  "young adult",
  "adult",
  "middle-aged",
  "older adult",
  "geriatric",
  "all ages"
];

const languages = [
  "en", // English
  "es", // Spanish
  "fr", // French
  "zh", // Chinese
  "ar", // Arabic
  "ru", // Russian
  "pt", // Portuguese
  "hi", // Hindi
  "bn", // Bengali
  "de", // German
  "ja", // Japanese
  "ko", // Korean
  "vi", // Vietnamese
  "it", // Italian
  "ur", // Urdu
  "fa", // Persian
  "tl", // Tagalog
  "ht", // Haitian Creole
  "hmn", // Hmong
  "so" // Somali
];

const literacyLevels = ["low", "medium", "high"];

const sources = [
  "MedlinePlus",
  "CDC",
  "WHO",
  "Mayo Clinic",
  "Cleveland Clinic",
  "NIH",
  "American Heart Association",
  "American Diabetes Association",
  "American Cancer Society",
  "National Institute of Mental Health",
  "American Academy of Pediatrics",
  "American Lung Association",
  "Arthritis Foundation",
  "Alzheimer's Association",
  "National Multiple Sclerosis Society",
  "American Academy of Family Physicians",
  "Johns Hopkins Medicine",
  "Harvard Health",
  "WebMD",
  "UpToDate"
];

// Function to generate a random item from an array
function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Function to generate a unique ID
function generateUniqueId(index) {
  return (index + 1).toString();
}

// Generate expanded titles and summaries for more variety
function expandTitlesAndSummaries() {
  const expandedTitles = [...titles];
  const expandedSummaries = [...summaries];

  // Generate variations of existing titles
  titles.forEach(title => {
    expandedTitles.push(`How to: ${title}`);
    expandedTitles.push(`A Guide to ${title}`);
    expandedTitles.push(`Understanding ${title}`);
  });

  // Generate variations of existing summaries
  summaries.forEach(summary => {
    expandedSummaries.push(`This resource helps you ${summary.toLowerCase()}`);
    expandedSummaries.push(`Learn more about how to ${summary.toLowerCase()}`);
    expandedSummaries.push(`Important information to help you ${summary.toLowerCase()}`);
  });

  return { expandedTitles, expandedSummaries };
}

// Get expanded content
const { expandedTitles, expandedSummaries } = expandTitlesAndSummaries();

// Function to generate a single dataset entry
function generateEntry(index) {
  const id = generateUniqueId(index);
  const title = getRandomItem(expandedTitles);

  // Find a matching summary based on content rather than just random selection
  let summary;
  if (Math.random() > 0.5) {
    // Select a summary that might match the title based on key terms
    const titleWords = title.toLowerCase().split(' ');
    const potentialMatches = expandedSummaries.filter(sum =>
      titleWords.some(word =>
        word.length > 3 && sum.toLowerCase().includes(word)
      )
    );

    summary = potentialMatches.length > 0
      ? getRandomItem(potentialMatches)
      : getRandomItem(expandedSummaries);
  } else {
    summary = getRandomItem(expandedSummaries);
  }

  // Choose tags with some logic
  let tags;
  const titleLower = title.toLowerCase();
  const matchingTagSets = tagSets.filter(tagSet =>
    tagSet.some(tag => titleLower.includes(tag.toLowerCase()))
  );

  tags = matchingTagSets.length > 0
    ? getRandomItem(matchingTagSets)
    : getRandomItem(tagSets);

  // Choose conditions with some logic
  let conditions;
  const matchingConditionSets = conditionSets.filter(condSet =>
    condSet.some(cond => titleLower.includes(cond.toLowerCase()))
  );

  conditions = matchingConditionSets.length > 0
    ? getRandomItem(matchingConditionSets)
    : getRandomItem(conditionSets);

  // Select an appropriate age group based on title
  let ageGroup;
  if (titleLower.includes("child") || titleLower.includes("pediatric") || titleLower.includes("newborn")) {
    ageGroup = getRandomItem(["infant", "child"]);
  } else if (titleLower.includes("adolescent") || titleLower.includes("teen")) {
    ageGroup = "adolescent";
  } else if (titleLower.includes("pregnancy") || titleLower.includes("prenatal")) {
    ageGroup = "adult";
  } else if (titleLower.includes("geriatric") || titleLower.includes("senior") || titleLower.includes("aging")) {
    ageGroup = getRandomItem(["older adult", "geriatric"]);
  } else {
    ageGroup = getRandomItem(ageGroups);
  }

  // Select language - increased probability for common languages
  let language;
  const languageRoll = Math.random();
  if (languageRoll < 0.6) {
    language = "en";  // 60% English
  } else if (languageRoll < 0.8) {
    language = getRandomItem(["es", "fr", "zh"]);  // 20% common languages
  } else {
    language = getRandomItem(languages);  // 20% any language
  }

  // Select literacy level based on content
  let literacyLevel;
  if (titleLower.includes("basic") || titleLower.includes("guide") || titleLower.includes("introduction")) {
    literacyLevel = "low";
  } else if (titleLower.includes("advanced") || titleLower.includes("management")) {
    literacyLevel = getRandomItem(["medium", "high"]);
  } else {
    literacyLevel = getRandomItem(literacyLevels);
  }

  // Select source based on content type
  let source;
  if (titleLower.includes("cancer")) {
    source = "American Cancer Society";
  } else if (titleLower.includes("heart") || titleLower.includes("stroke")) {
    source = "American Heart Association";
  } else if (titleLower.includes("diabetes")) {
    source = "American Diabetes Association";
  } else {
    source = getRandomItem(sources);
  }

  return {
    id,
    title,
    summary,
    tags,
    conditions,
    age_group: ageGroup,
    language,
    literacy_level: literacyLevel,
    source
  };
}

// Generate the full dataset of 10,000 entries
function generateFullDataset(size = 10000) {
  const dataset = [];
  for (let i = 0; i < size; i++) {
    dataset.push(generateEntry(i));
  }
  return dataset;
}

// Generate a sample of entries to display
const sampleSize = 20;
const sampleDataset = generateFullDataset(sampleSize);

console.log("Sample Healthcare Topics Dataset (20 entries):");
console.log(JSON.stringify(sampleDataset, null, 2));

// The function to generate the full 10,000 entries is ready to use with:
const fullDataset = generateFullDataset();
// console.log(JSON.stringify(fullDataset, null, 2));

// In a real application, you would likely save this to a file:
const fs = require('fs');
fs.writeFileSync('healthcare_topics_10k.json', JSON.stringify(fullDataset, null, 2));