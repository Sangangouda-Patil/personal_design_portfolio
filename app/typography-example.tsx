import Background from "@/components/shared/Background"
import ExampleTypography from "@/components/shared/ExampleTypography"

export default function TypographyExamplePage() {
  return (
    <Background>
      <div className="container mx-auto px-4 py-12 pt-32">
        <h1 className="text-4xl font-bold font-rubik mb-8 text-center">Typography Examples</h1>
        <ExampleTypography />
      </div>
    </Background>
  )
}
