"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState } from "react"

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const faqs = [
    {
      id: "shipping",
      question: "What are your shipping options and costs?",
      answer:
        "We offer free standard shipping on orders over $75. Standard shipping (5-7 business days) costs $8.99, expedited shipping (2-3 business days) costs $15.99, and overnight shipping costs $25.99. International shipping is available with rates calculated at checkout.",
    },
    {
      id: "returns",
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for unworn items in original packaging. Returns are free for defective items or wrong size exchanges. For other returns, a $5.99 return shipping fee applies. Refunds are processed within 5-7 business days after we receive your return.",
    },
    {
      id: "sizing",
      question: "How do I find the right size?",
      answer:
        "Each product page includes a detailed size chart. We recommend measuring your feet and comparing to our size guide. If you're between sizes, we generally recommend sizing up for athletic shoes and sizing down for dress shoes. Our customer service team is also available to help with sizing questions.",
    },
    {
      id: "care",
      question: "How should I care for my shoes?",
      answer:
        "Care instructions vary by material. For leather shoes, use a leather conditioner monthly and store with shoe trees. For athletic shoes, remove insoles and air dry after use. Avoid machine washing unless specifically indicated. We include care instructions with every purchase.",
    },
    {
      id: "warranty",
      question: "Do you offer a warranty on your shoes?",
      answer:
        "Yes! We offer a 1-year warranty against manufacturing defects. This covers issues like sole separation, stitching problems, or material defects under normal use. The warranty doesn't cover normal wear and tear or damage from misuse.",
    },
    {
      id: "payment",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Shop Pay. We also offer buy-now-pay-later options through Klarna and Afterpay for qualifying purchases.",
    },
    {
      id: "availability",
      question: "What if my size is out of stock?",
      answer:
        "You can sign up for restock notifications on any product page. We'll email you as soon as your size becomes available. You can also contact our customer service team to check if we expect a restock or if the item is available in our retail stores.",
    },
    {
      id: "international",
      question: "Do you ship internationally?",
      answer:
        "Yes, we ship to over 50 countries worldwide. International shipping costs and delivery times vary by destination. Customers are responsible for any customs duties or taxes. Some restrictions may apply to certain countries or products.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4"
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground text-balance">Frequently Asked Questions</h1>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              Find answers to common questions about our products, shipping, returns, and more
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-md">
                  <Collapsible open={openItems.includes(faq.id)} onOpenChange={() => toggleItem(faq.id)}>
                    <CollapsibleTrigger className="w-full">
                      <CardContent className="p-6 flex items-center justify-between hover:bg-muted/50 transition-colors">
                        <h3 className="text-lg font-semibold text-foreground text-left">{faq.question}</h3>
                        <ChevronDown
                          className={`h-5 w-5 text-muted-foreground transition-transform ${
                            openItems.includes(faq.id) ? "rotate-180" : ""
                          }`}
                        />
                      </CardContent>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="px-6 pb-6 pt-0">
                        <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
