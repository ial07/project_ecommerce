import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { ApiError } from "@/types/Api.type";
import { productSchema } from "@/lib/validation/product.validation";
import { usePostSeller } from "@/hooks/useProducts";
import z from "zod";

const useSellerProductForm = () => {
  const router = useRouter();
  const { mutate: addProduct, isPending, isError, error } = usePostSeller();

  // ✅ Use z.output so we get transformed types (numbers)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<z.input<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      stock: 0,
      categoryId: 0,
      images: [],
    },
  });

  const onSubmit: SubmitHandler<z.input<typeof productSchema>> = (data) => {
    console.log("✅ Form validated data:", data);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description || "");
    formData.append("price", data.price.toString());
    formData.append("stock", data.stock.toString());
    formData.append("categoryId", data.categoryId.toString());
    data.images?.forEach((file) => formData.append("images", file));

    addProduct(formData, {
      onSuccess: () => {
        reset();
        router.push("/seller/products");
      },
    });
  };

  const errorMessage = (error as AxiosError<ApiError>)?.response?.data?.message;

  return {
    register,
    handleSubmit,
    errors,
    reset,
    onSubmit,
    isPending,
    isError,
    errorMessage,
    setValue,
    watch,
  };
};

export default useSellerProductForm;
