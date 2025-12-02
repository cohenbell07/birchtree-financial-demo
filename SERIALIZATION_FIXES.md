# Serialization Errors - Fixed

## Issues Found and Fixed

### 1. **Next.js 14 Params Not Awaited**
   - **Problem**: In Next.js 14, dynamic route params are Promises that must be awaited
   - **Fixed in**:
     - `app/services/[service]/page.tsx` - Updated to await params
     - `app/team/[slug]/page.tsx` - Updated to await params
     - `app/services/[service]/layout.tsx` - Updated generateMetadata to await params

### 2. **Server Components Using Framer Motion Directly**
   - **Problem**: Server components cannot use framer-motion directly, causing serialization errors
   - **Fixed**: Made pages using motion into client components:
     - `app/page.tsx` - Now a client component ("use client")
     - Other pages already marked as client components where needed

### 3. **Metadata Structure**
   - **Fixed**: Moved metadata from pages to layout files where needed
   - All metadata objects now contain only serializable values (strings, plain objects)

### 4. **TypeScript Type Errors**
   - **Fixed**: Added proper type guards for union types in resources page
   - Used `"property" in object` checks instead of direct property access

### 5. **ESLint Warnings**
   - **Fixed**: Escaped all unescaped quotes in JSX text content

## Key Changes Made

1. **Dynamic Route Params**: All `params` are now properly typed as `Promise<{...}>` and awaited
2. **Client Components**: Pages using framer-motion are now client components
3. **Metadata Separation**: Metadata moved to layout files for client component pages
4. **Type Safety**: Fixed TypeScript errors with proper type guards

## Testing

Run `npm run dev` to verify all fixes work correctly. The application should now:
- Build without serialization errors
- Run without runtime errors
- Load all pages correctly

