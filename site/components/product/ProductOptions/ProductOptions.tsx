import { memo } from 'react'
import { Swatch } from '@components/product'
import type { ProductOption } from '@commerce/types/product'
import { SelectedOptions } from '../helpers'
import { VariantSelector } from '@trelliscommerce/react-components';

interface ProductOptionsProps {
  options: ProductOption[]
  selectedOptions: SelectedOptions
  setSelectedOptions: React.Dispatch<React.SetStateAction<SelectedOptions>>
}

const ProductOptions: React.FC<ProductOptionsProps> = ({
  options,
  selectedOptions,
  setSelectedOptions,
}) => {
 function mapVariants(variants) {
   const v =  variants.map((variant, i) => {
     console.log(variant)
     return {name: variant.label, id: i, isEnabled: true, color: variant.hexColors ? variant.hexColors[0] : null }
   })
   console.log(v)
   return v
 }
  return (
    <div>
      {options.map((opt, i) => (
        <div className="pb-4" key={opt.displayName}>
          <h2 className="uppercase font-medium text-sm tracking-wide">
            {opt.displayName}
          </h2>
          <div role="listbox" className="flex flex-row py-4">
            <VariantSelector
              key={`${opt.id}-${i}`}
              label="VariantSelector"
              typeLabel="color"
              variants={mapVariants(opt.values)}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default memo(ProductOptions)
