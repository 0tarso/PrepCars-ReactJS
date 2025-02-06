//Components
import MotionDiv from '../motionDiv'

//Typescript interface
import { RuleCardProps } from '../../types'


const RuleCard = ({ text, title }: RuleCardProps) => {
  return (
    <MotionDiv>
      <section className="w-full h-64 bg-gray-100 rounded-lg p-4 relative drop-shadow-lg ">

        <p className='font-medium'>{text}</p>

        <div className='bg-red-800 w-full text-4xl font-bold absolute bottom-4 -skew-x-6 rounded-md p-2 drop-shadow-lg '>

          <h2 className='text-white'>{title}</h2>

        </div>

      </section>
    </MotionDiv>
  )
}

export default RuleCard