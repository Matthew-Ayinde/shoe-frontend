"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  Tag,
  Search,
  Filter,
  TrendingUp,
  Heart,
  MessageCircle,
  Share2,
  BookOpen
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AnimatedButton } from "@/components/ui/animated-button"
import { FloatingCard } from "@/components/ui/floating-card"
import { ParticleBackground } from "@/components/ui/particle-background"
import { LazyImage } from "@/components/ui/lazy-image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const featuredPost = {
  id: 1,
  title: "The Future of Sustainable Footwear: Innovation Meets Responsibility",
  excerpt: "Discover how cutting-edge technology and eco-conscious materials are revolutionizing the shoe industry, creating products that are both stylish and sustainable.",
  image: "/blog/sustainable-footwear.jpg",
  author: "Sarah Chen",
  authorImage: "/team/sarah-chen.jpg",
  date: "2024-01-15",
  readTime: "8 min read",
  category: "Sustainability",
  tags: ["Innovation", "Eco-Friendly", "Technology"],
  featured: true
}

const blogPosts = [
  {
    id: 2,
    title: "How to Choose the Perfect Running Shoes for Your Foot Type",
    excerpt: "A comprehensive guide to finding running shoes that match your gait, foot shape, and running style for optimal performance and comfort.",
    image: "/blog/running-shoes-guide.jpg",
    author: "Marcus Rodriguez",
    authorImage: "/team/marcus-rodriguez.jpg",
    date: "2024-01-12",
    readTime: "6 min read",
    category: "Guides",
    tags: ["Running", "Fitness", "Health"]
  },
  {
    id: 3,
    title: "The Art of Shoe Care: Extending the Life of Your Footwear",
    excerpt: "Professional tips and techniques for maintaining your shoes, from daily care routines to deep cleaning and restoration methods.",
    image: "/blog/shoe-care.jpg",
    author: "Emily Watson",
    authorImage: "/team/emily-watson.jpg",
    date: "2024-01-10",
    readTime: "5 min read",
    category: "Care & Maintenance",
    tags: ["Care", "Maintenance", "Tips"]
  },
  {
    id: 4,
    title: "Fashion Forward: Spring 2024 Footwear Trends",
    excerpt: "Explore the latest trends in footwear fashion, from bold colors and patterns to innovative silhouettes that are defining the season.",
    image: "/blog/spring-trends.jpg",
    author: "David Kim",
    authorImage: "/team/david-kim.jpg",
    date: "2024-01-08",
    readTime: "4 min read",
    category: "Fashion",
    tags: ["Trends", "Fashion", "Style"]
  },
  {
    id: 5,
    title: "The Science Behind Comfort: Understanding Foot Biomechanics",
    excerpt: "Dive deep into the science of foot mechanics and how understanding your unique biomechanics can help you choose better footwear.",
    image: "/blog/foot-science.jpg",
    author: "Dr. Lisa Park",
    authorImage: "/team/lisa-park.jpg",
    date: "2024-01-05",
    readTime: "7 min read",
    category: "Science",
    tags: ["Science", "Comfort", "Health"]
  },
  {
    id: 6,
    title: "Workplace Footwear: Balancing Style and Professionalism",
    excerpt: "Navigate the world of professional footwear with confidence, finding shoes that are both appropriate for the workplace and express your personal style.",
    image: "/blog/workplace-shoes.jpg",
    author: "Jennifer Adams",
    authorImage: "/team/jennifer-adams.jpg",
    date: "2024-01-03",
    readTime: "5 min read",
    category: "Professional",
    tags: ["Workplace", "Professional", "Style"]
  }
]

const categories = [
  { name: "All", count: 25 },
  { name: "Sustainability", count: 8 },
  { name: "Guides", count: 12 },
  { name: "Fashion", count: 6 },
  { name: "Science", count: 4 },
  { name: "Professional", count: 3 }
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="hidden md:block">
        <Navigation />
      </div>
      <ParticleBackground />
      
      <main className="relative z-10 pb-20 md:pb-0">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-8"
            >
              <div className="space-y-4">
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  <BookOpen className="w-3 h-3 mr-1" />
                  StepForward Blog
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                  Stories, Insights &{" "}
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    Inspiration
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Discover the latest trends, expert advice, and behind-the-scenes stories 
                  from the world of footwear innovation and style.
                </p>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    placeholder="Search articles..." 
                    className="pl-10 h-12"
                  />
                </div>
                <Button variant="outline" size="lg" className="h-12 px-6">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold mb-8 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-primary" />
                Featured Article
              </h2>
              
              <FloatingCard className="overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative aspect-video lg:aspect-square">
                    <LazyImage
                      src="/placeholder.svg"
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-primary-foreground">
                        Featured
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="space-y-6">
                      <div className="flex flex-wrap gap-2">
                        {featuredPost.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div>
                        <h3 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight">
                          {featuredPost.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {featuredPost.excerpt}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-muted overflow-hidden">
                              <LazyImage
                                src="/placeholder.svg"
                                alt={featuredPost.author}
                                width={32}
                                height={32}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="text-sm font-medium">{featuredPost.author}</span>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              Jan 15, 2024
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {featuredPost.readTime}
                            </div>
                          </div>
                        </div>
                        
                        <AnimatedButton 
                          animation="magnetic"
                          asChild
                        >
                          <Link href={`/blog/${featuredPost.id}`}>
                            Read More
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </AnimatedButton>
                      </div>
                    </div>
                  </div>
                </div>
              </FloatingCard>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Button 
                    variant={category.name === "All" ? "default" : "outline"}
                    className="h-10"
                  >
                    {category.name}
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {category.count}
                    </Badge>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <FloatingCard className="h-full overflow-hidden group cursor-pointer">
                    <Link href={`/blog/${post.id}`}>
                      <div className="relative aspect-video overflow-hidden">
                        <LazyImage
                          src="/placeholder.svg"
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-background/90 text-foreground">
                            {post.category}
                          </Badge>
                        </div>
                      </div>
                      
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-1">
                            {post.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <h3 className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                          
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {post.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between pt-4 border-t">
                            <div className="flex items-center space-x-2">
                              <div className="w-6 h-6 rounded-full bg-muted overflow-hidden">
                                <LazyImage
                                  src="/placeholder.svg"
                                  alt={post.author}
                                  width={24}
                                  height={24}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="text-xs font-medium">{post.author}</span>
                            </div>
                            
                            <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                              <div className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {post.readTime}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Link>
                  </FloatingCard>
                </motion.div>
              ))}
            </div>
            
            {/* Load More */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <AnimatedButton 
                variant="outline" 
                size="lg"
                animation="magnetic"
              >
                Load More Articles
              </AnimatedButton>
            </motion.div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-muted/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Stay Updated with{" "}
                  <span className="bg-gradient-primary bg-clip-text text-transparent">
                    Our Latest Stories
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Get the latest articles, trends, and insights delivered straight to your inbox. 
                  Join our community of footwear enthusiasts.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input 
                  placeholder="Enter your email" 
                  className="h-12"
                />
                <AnimatedButton 
                  size="lg" 
                  className="bg-gradient-primary h-12"
                  animation="glow"
                >
                  Subscribe
                </AnimatedButton>
              </div>
              
              <p className="text-sm text-muted-foreground">
                No spam, unsubscribe at any time. We respect your privacy.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
