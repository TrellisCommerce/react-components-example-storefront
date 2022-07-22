import s from './ProductSidebar.module.css'
import { useAddItem } from '@framework/cart'
import { FC, useEffect, useState } from 'react'
import { ProductOptions } from '@components/product'
import type { Product } from '@commerce/types/product'
import { Text, Rating, Collapse, useUI } from '@components/ui'
import { StarRating, Button } from '@trelliscommerce/react-components';
import {
  getProductVariant,
  selectDefaultOptionFromProduct,
  SelectedOptions,
} from '../helpers'

interface ProductSidebarProps {
  product: Product
  className?: string
}

const ProductSidebar: FC<ProductSidebarProps> = ({ product, className }) => {
  const addItem = useAddItem()
  const { openSidebar, setSidebarView } = useUI()
  const [loading, setLoading] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})

  useEffect(() => {
    selectDefaultOptionFromProduct(product, setSelectedOptions)
  }, [product])

  const variant = getProductVariant(product, selectedOptions)
  const addToCart = async () => {
    setLoading(true)
    try {
      await addItem({
        productId: String(product.id),
        variantId: String(variant ? variant.id : product.variants[0]?.id),
      })
      setSidebarView('CART_VIEW')
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  return (
    <div className={className}>
      <ProductOptions
        options={product.options}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
      <Text
        className="pb-4 break-words w-full max-w-xl"
        html={product.descriptionHtml || product.description}
      />
      <StarRating
        onChange={function noRefCheck(){}}
        reviewCount={36}
        showStarCount
        starRating={3.5}
      />
      <StarRating
        isEditable
        onChange={function noRefCheck(){}}
        reviewCount={36}
        showStarCount
        starRating={3.5}
      />
      <div className="flex flex-row justify-between items-center">
        {/*<Rating value={4} />*/}
        {/*<div className="text-accent-6 pr-1 font-medium text-sm">36 reviews</div>*/}
      </div>
      <div>
        {process.env.COMMERCE_CART_ENABLED && (
          <Button
            onClick={addToCart}
            loading={loading}
          className={s.button}
          component="Button"
          displayText="Add to Cart"
          disabled={variant?.availableForSale === false}
          primary
          />
        )}
      </div>
      <div className="mt-6">
        <Collapse title="Care">
          This is a limited edition production run. Printing starts when the
          drop ends.
        </Collapse>
        <Collapse title="Details">
          This is a limited edition production run. Printing starts when the
          drop ends. Reminder: Bad Boys For Life. Shipping may take 10+ days due
          to COVID-19.
        </Collapse>
      </div>
    </div>
  )
}

export default ProductSidebar
