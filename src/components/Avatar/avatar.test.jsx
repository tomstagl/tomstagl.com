import '@testing-library/jest-dom'
import React from 'react'
import { render } from '@testing-library/react'

import { PureAvatar as Avatar } from './avatar'

describe('Avatar', () => {
  it('renders the correct title', () => {
    const data = {
      avatarImage: {
        childImageSharp: {
          fluid: {
            base64:
              'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAC4jAAAuIwF4pT92AAAEf0lEQVQ4y3VTDUxTVxR+LeiSbS5L5n4wC9AW+l9ARMh+3BbIHFCEaGIkwgLMQTamDDuHTAgyYCudgCKtiFYcBQQkoAiUnxAnrIWMCZahdCQKm9MaBGw3dPSH3rN3L5QgzJOcd85997zvfOe791HUKrveWUeBrpLkM7qLzNX7C4ZW5qRziuRPjFdJBAASEULUGrveVEbi3EAjc6mYafv9Wqh9YiB23mTwJB9eUVGmJRCXwar1UzajX2R2b7A94LG+YcQ50ABgaAHriHbeNt77Kd5zjrQzLDNGiuG2fhlsDWiffpD6pUVN8squ9hfutpVPWrVlYGk76ZjrUjmsV9UAo63w942Obbjm8XArE4O4Rl0DCM9TlEH7oxvOh7Wa6L8uFYOprsA+11KKrF0VaL77jA3GteAY61YSlsZu94gV2v3v2EMNSnccda1V+yYulYLqs712ZXIsGlNmoMZDnzh0KgVM9dXX4Jp/e6vcKXHWsw/FfKaQylPLiX6GqhJNf/lRUOzZ6cjeuQNdzkhC6pQEZ7eiAP5oq/gTJjteJoenr2U8U8N/fkjFr0k+JT9gnNTIYUhxyNm5PwFNaorRuKoATVSXIOu1arAVp7IJy+p8xjNHtpzNp+6qvyMMZ89933SvoQh+K0q392amQE9uGrqjliMzLYNVX2e11Z/ahOtsneeXAdeMPEV3eKQtZ+DcOtq9+VZdiUUn/xya9ic4ew+kwMix7IXpllKw32iSk/qT6YyF+z8/fW1cC6vVSnkwFoH1+fvISd9sPls5qsqE/rwvHH1Hv0T3LxSBueu0fW7oijcZd6iZTGMymaiVkVD9NjeH5MdOn6OO73lrHc6NDSfKhk/IYKAwzTFU8rVjruMUPNHXNuO9i8VH1mEy38TFUMaxscVDNZtpDWxWKvzD7eRFbk42M+wVivAskiWGjVQcfvBTVjx0Z8U5dYrkhdkWOX1lqqpdEq1nPucWExXllpOdTdbT09P0b4YftCUnJrq5Cjl8P1lZTjqYaw9Dj2yXs1+RDDfVMvSovRDN/XoBykoUDXvjk3xW6h8oluC/hkE03BUdTcAePDRtiJFKNQFiCXC4AtDWqBYe1ufDbVUqmqrPgtnLeQgGq1Gl8jiIBSJbVHi4Jnb3bimNQSQqV6rcqYT4eAJ2RCYLpoHvhARtBZFA6PD29EIeb3pBZoYMGVrOg0XfiCx9NXBb14EiIiIdfI4PBG/eAsGBW+D9d969FR4Wum2Z7ldp6dLI7R/BVnpTIhLbBTwBEvAFwGGx0YYXXwKWLx+k0TEQGbUDsX180aY3PEAsFKIAiZ9DIhRhh7eDQ+zpBw8GUkV5Ba+HvveB2V/iR8BoBz6Pj7i+XOTr4ws8Lhe8PT3htY2vEsc5lwb15fggAV0X4OePhDy+TcSjm0ZE9FBJcR9XuZiJhELARTwazIceCTuHzSGOwfGazWIBy5uF2RNgAZ+PmdI1bBQSFARUTKQU/MUSupMfCPkCtNQdFyw6/SGbxSagGMjbi3ZPLzr3Jg14XB7CRCS0BCIeD/0HUUuUNMz6Pd4AAAAASUVORK5CYII=',
            aspectRatio: 1,
            src: '/static/8016f19853ebfc64e08a238d4badf906/62915/avatar.png',
            srcSet:
              '/static/8016f19853ebfc64e08a238d4badf906/5db04/avatar.png 75w,\n/static/8016f19853ebfc64e08a238d4badf906/62915/avatar.png 128w',
            sizes: '(max-width: 128px) 100vw, 128px',
          },
        },
      },
    }
    const { getByTestId } = render(<Avatar title="Test" data={data} />)
    expect(getByTestId('avatar-title')).toHaveTextContent('Test')
  })
})
