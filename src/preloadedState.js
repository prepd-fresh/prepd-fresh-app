const preloadedState = {
  heroImageUrl: 'Photo-by-Daniel-Park-on-Unsplash.jpg',
  infoCards: [
      {
          imageUrl: 'Photo-by-Megan-Hodges-on-Unsplash.jpg',
          hed: 'A menu that updates every week',
          dek: 'Every week features a fresh menu, to keep your tastebuds happy!'
      },
      {
          imageUrl: 'Photo-by-Suhyeon-Choi-on-Unsplash.jpg',
          hed: 'A menu that updates every week',
          dek: 'Every week features a fresh menu, to keep your tastebuds happy!'
      },
      {
          imageUrl: 'Photo-by-Fabian-Blank-on-Unsplash.jpg',
          hed: 'A menu that updates every week',
          dek: 'Every week features a fresh menu, to keep your tastebuds happy!'
      },
  ],
  testimonialHeadingImgUrl: 'Photo-by-Katherine-Chase-on-Unsplash.jpg',
  testimonials: [
      {
          id: 'fdga78df6gasd',
          imageUrl: 'testimonials-1.jpg',
          name: 'Firstname L.',
          quote: 'This space is reserved for a quote from one of our users!'
      },
      {
          id: 'asdf78df6gasd',
          imageUrl: 'testimonials-2.jpg',
          name: 'Firstname L.',
          quote: 'This space is reserved for a quote from one of our users!'
      },
      {
          id: 'erty78df6gasd',
          imageUrl: 'testimonials-3.jpg',
          name: 'Firstname L.',
          quote: 'This space is reserved for a quote from one of our users!'
      },
  ],
  sliderImgUrl: 'Photo-by-yvonne-lee-harijanto-on-Unsplash.jpg',
  products: {
      fdga78df6gasd: {
          type: 'meal',
          id: 'fdga78df6gasd',
          productName: 'Pesto Chicken',
          dek: 'This is a brief description of the menu item, yum yum yum yum yum!',
          veggie: false,
          imageUrl: 'meal_1.jpg',
      },
      sd79fsd89afsd: {
          type: 'meal',
          id: 'sd79fsd89afsd',
          productName: 'Broccoli Salad',
          dek: 'This is a brief description of the menu item, yum!',
          veggie: false,
          imageUrl: 'meal_2.jpg',
      },
      a978df6g7869agasd: {
          type: 'meal',
          id: 'a978df6g7869agasd',
          productName: 'Something Else',
          dek: 'This is a brief description of the menu item, yum!',
          veggie: false,
          imageUrl: 'meal_3.jpg',
      },
      v6789bnb87nm6vbnm: {
          type: 'meal',
          id: 'v6789bnb87nm6vbnm',
          productName: 'Vegetarian Dish',
          dek: 'This is a brief description of the menu item, yum!',
          veggie: true,
          imageUrl: 'meal_3.jpg',
      },
  },
  productSizeVariants: {
      erty78df6gasd: {
          id: "erty78df6gasd",
          productId: "fdga78df6gasd",
          size: "lg",
          price: 7.99,
          nutrition: {
              cal: 400,
              car: 55,
              fat: 24,
              pro: 25
          },
      },
      o97sdg09ads09ds: {
          id: "o97sdg09ads09ds",
          productId: "fdga78df6gasd",
          size: "reg",
          price: 6.99,
          nutrition: {
              cal: 300,
              car: 46,
              fat: 22,
              pro: 24
          },
      },
      sdf879asd8gasd87: {
          id: "sdf879asd8gasd87",
          productId: "sd79fsd89afsd",
          size: "lg",
          price: 7.99,
          nutrition: {
              cal: 400,
              car: 55,
              fat: 24,
              pro: 25
          },
      },
      iou3423oi4uo23i4: {
          id: "iou3423oi4uo23i4",
          productId: "sd79fsd89afsd",
          size: "reg",
          price: 6.99,
          nutrition: {
              cal: 300,
              car: 46,
              fat: 22,
              pro: 24
          },
      },
      poi2u345oiu34255: {
          id: "poi2u345oiu34255",
          productId: "a978df6g7869agasd",
          size: "lg",
          price: 7.99,
          nutrition: {
              cal: 400,
              car: 55,
              fat: 24,
              pro: 25
          },
      },
      asd9bn74bn7456bn: {
          id: "asd9bn74bn7456bn",
          productId: "a978df6g7869agasd",
          size: "reg",
          price: 6.99,
          nutrition: {
              cal: 300,
              car: 46,
              fat: 22,
              pro: 24
          },
      },
      qw567r6e7werq57r: {
          id: "qw567r6e7werq57r",
          productId: "v6789bnb87nm6vbnm",
          size: "lg",
          price: 7.99,
          nutrition: {
              cal: 400,
              car: 55,
              fat: 24,
              pro: 25
          },
      },
      zz9xc8v7xz6vxcz786: {
          id: "zz9xc8v7xz6vxcz786",
          productId: "v6789bnb87nm6vbnm",
          size: "reg",
          price: 6.99,
          nutrition: {
              cal: 300,
              car: 46,
              fat: 22,
              pro: 24
          },
      },
  },
  cart: {
      oisdfa01: {
          id: "oisdfa01",
          productId: "fdga78df6gasd",
          name: "Chicken Pesto",
          itemPrice: 4.99,
          size: "regular",
          veggie: false,
          qty: 1
      },
      oisdfa02: {
          id: "oisdfa02",
          productId: "asdf78df6gasd",
          name: "Broccoli Salad",
          itemPrice: 7.99,
          size: "large",
          veggie: true,
          qty: 4
      },
      oisdfa03: {
          id: "oisdfa03",
          productId: "erty78df6gasd",
          name: "Something Else",
          itemPrice: 7.99,
          size: "large",
          veggie: true,
          qty: 2
      },
  }
};

export default preloadedState;