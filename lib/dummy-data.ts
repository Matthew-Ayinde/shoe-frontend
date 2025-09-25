export interface Product {
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  subcategory: string
  sizes: string[]
  colors: string[]
  description: string
  features: string[]
  rating: number
  reviewCount: number
  isNew?: boolean
  isSale?: boolean
}

export const products: Product[] = [
  {
    id: "1",
    name: "Air Max Revolution",
    brand: "Nike",
    price: 129.99,
    originalPrice: 159.99,
    images: ["/nike-air-max-blue-sneaker.jpg", "/nike-air-max-blue-sneaker-side.jpg", "/nike-air-max-blue-sneaker-back.jpg"],
    category: "men",
    subcategory: "athletic",
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    colors: ["Blue", "White", "Black"],
    description:
      "Experience ultimate comfort and style with the Air Max Revolution. Featuring advanced cushioning technology and a sleek design.",
    features: ["Air Max cushioning", "Breathable mesh upper", "Rubber outsole", "Lightweight design"],
    rating: 4.5,
    reviewCount: 128,
    isSale: true,
  },
  {
    id: "2",
    name: "Classic Leather Oxford",
    brand: "Cole Haan",
    price: 199.99,
    images: ["/brown-leather-oxford-dress-shoe.jpg", "/brown-leather-oxford-dress-shoe-side.jpg"],
    category: "men",
    subcategory: "dress",
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    colors: ["Brown", "Black"],
    description:
      "Timeless elegance meets modern comfort in this classic leather oxford. Perfect for professional and formal occasions.",
    features: ["Premium leather upper", "Cushioned insole", "Leather sole", "Goodyear welt construction"],
    rating: 4.8,
    reviewCount: 89,
    isNew: true,
  },
  {
    id: "3",
    name: "Ultra Boost Runner",
    brand: "Adidas",
    price: 149.99,
    images: ["/adidas-ultraboost-white-running-shoe.jpg", "/adidas-ultraboost-white-running-shoe-side.jpg"],
    category: "women",
    subcategory: "athletic",
    sizes: ["5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10"],
    colors: ["White", "Black", "Pink"],
    description: "Revolutionary running shoe with responsive cushioning and energy return for your best performance.",
    features: ["Boost midsole", "Primeknit upper", "Continental rubber outsole", "Torsion system"],
    rating: 4.7,
    reviewCount: 203,
  },
  {
    id: "4",
    name: "Chelsea Boot Premium",
    brand: "Dr. Martens",
    price: 179.99,
    images: ["/black-leather-chelsea-boot.jpg", "/black-leather-chelsea-boot-side.jpg"],
    category: "women",
    subcategory: "boots",
    sizes: ["5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10"],
    colors: ["Black", "Brown"],
    description: "Iconic Chelsea boot with premium leather construction and signature comfort.",
    features: ["Premium leather", "Air-cushioned sole", "Elastic side panels", "Pull-on design"],
    rating: 4.6,
    reviewCount: 156,
  },
  {
    id: "5",
    name: "Kids Adventure Sneaker",
    brand: "New Balance",
    price: 69.99,
    images: ["/kids-colorful-sneaker-velcro.jpg", "/kids-colorful-sneaker-velcro-side.jpg"],
    category: "kids",
    subcategory: "athletic",
    sizes: ["10", "10.5", "11", "11.5", "12", "12.5", "13", "1", "1.5", "2", "2.5", "3"],
    colors: ["Blue", "Red", "Green"],
    description: "Durable and comfortable sneakers designed for active kids. Easy velcro closure for independence.",
    features: ["Velcro closure", "Reinforced toe", "Non-slip sole", "Machine washable"],
    rating: 4.4,
    reviewCount: 92,
  },
  {
    id: "6",
    name: "Casual Canvas Slip-On",
    brand: "Vans",
    price: 59.99,
    images: ["/vans-slip-on-canvas-shoe-checkered.jpg", "/vans-slip-on-canvas-shoe-checkered-side.jpg"],
    category: "men",
    subcategory: "casual",
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12"],
    colors: ["Checkered", "Black", "White"],
    description: "Classic slip-on design with iconic style. Perfect for casual everyday wear.",
    features: ["Canvas upper", "Elastic side accents", "Signature waffle outsole", "Padded collar"],
    rating: 4.3,
    reviewCount: 167,
  },
]

export const categories = [
  {
    id: "men",
    name: "Men",
    image: "/mens-shoes-collection.jpg",
    subcategories: ["athletic", "dress", "casual", "boots"],
  },
  {
    id: "women",
    name: "Women",
    image: "/womens-shoes-collection.jpg",
    subcategories: ["athletic", "dress", "casual", "boots", "heels"],
  },
  {
    id: "kids",
    name: "Kids",
    image: "/placeholder.svg?height=300&width=400",
    subcategories: ["athletic", "casual", "school"],
  },
]

export const brands = ["Nike", "Adidas", "New Balance", "Vans", "Converse", "Dr. Martens", "Cole Haan", "Timberland"]
