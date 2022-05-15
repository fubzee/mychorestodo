const db = require('../config/connection');
const { Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Animal Welfare' },
    { name: 'Cancer' },
    { name: 'Mental Heatlh' },
    { name: 'Other' },
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Animal Welfare League',
      description:
        'Animal Welfare League NSW is a registered charity that has been caring for surrendered, neglected and abandoned animals for over 60 years',
      image: 'AWF.png',
      category: categories[0]._id,
      price: 5.00,
      quantity: 500
    },
    {
      name: 'RSPCA NSW',
      description:
        'Your donation will go directly to supporting the work of your local RSPCA shelter. Each year, more than 33,535 animals turn to RSPCA NSW for help. Donate By June 30. Help an Animal in Need.',
      image: 'RSPCA.png',
      category: categories[0]._id,
      price: 5.00,
      quantity: 500
    },
    {
      name: 'Prostrate Cancer Foundation',
      category: categories[1]._id,
      description:
        'Prostate Cancer Foundation of Australia is a broad-based community organisation and the peak national body for prostate cancer in Australia. The Foundation is dedicated to reducing the impact of prostate cancer on Australian men, their partners and families, recognising the diversity of the Australian community..',
      image: 'PCF.png',
      price: 5.00,
      quantity: 500
    },
    {
      name: 'Breast Cancer Foundation',
      category: categories[1]._id,
      description:
        'The National Breast Cancer Foundation (NBCF) is Australia’s leading national body funding world-class, game-changing breast cancer research. 9 Australians lose their life every day to breast cancer. We receive no government funding, we need your continued support to change the statistics..',
      image: 'NBCF.png',
      price: 5.00,
      quantity: 500
    },
    {
      name: 'Starlight Foundation',
      category: categories[1]._id,
      description:
        'At Starlight we know that happiness matters to sick kids facing the pain, fear and stress of serious illness. That’s why we work in partnership with health professionals to bring the fun, joy and laughter that is essential to sick kids’ health and wellbeing.',
      image: 'SFD.png',
      price: 5.00,
      quantity: 500
    },
    {
      name: 'Black Dog Institure',
      category: categories[2]._id,
      description:
        'Black Dog Institute has a clearly articulated vision for a mentally healthier world. This vision guides our 2022-2026 strategy to deliver research with real world impact to treat, manage and prevent common mental health conditions and suicide in workplaces, schools, health settings and the wider community.',
      image: 'BDI.png',
      price: 5.00,
      quantity: 500
    },
    {
      name: 'HeadSpace',
      category: categories[2]._id,
      description:
        'We support young people with mental health, physical health (including sexual health), alcohol and other drug services, as well as work and study support. With a focus on early intervention, we work with young people to provide support at a crucial time in their lives – to help get them back on track and strengthen their ability to manage their mental health in the future. ',
      image: 'HSC.png',
      price: 5.00,
      quantity: 500
    },
    {
      name: 'Bear Cottage',
      category: categories[3]._id,
      description:
        'Bear Cottage provides support, respite and end-of-life care for children with life-limiting conditions and their families, in a warm homelike environment.',
      image: 'Bear.png',
      price: 5.00,
      quantity: 500
    },
    {
      name: 'Assistance Dogs - Australia',
      category: categories[3]._id,
      description: 'Assistance Dogs Australia trains and places unique dogs with Australians in unique situations. We currently train dogs that specialise in support for people with a physical disability, autism or PTSD. As well as providing a range of services to these individuals and their families.',
      image: 'ADA.png',
      price: 5.00,
      quantity: 500
    },
  ]);

  console.log('products seeded');

  process.exit();
});
