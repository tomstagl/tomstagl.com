const Section = ({ children, className }) => {
  return (
    <section className="p-4 max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto">
      {children}
    </section>
  )
}

export default Section
