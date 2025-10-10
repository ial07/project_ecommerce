import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { OpenStoreTypes } from "@/types/Seller.type";
import { openStoreSchema } from "@/lib/validation/seller.validation";
import { usePostSellerActivate } from "@/hooks/useSeller";
import { AxiosError } from "axios";
import { ApiError } from "@/types/Api.type";

const useOpenStoreForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OpenStoreTypes>({
    resolver: zodResolver(openStoreSchema),
  });

  const {
    mutate: activateSeller,
    isPending,
    isError,
    error,
  } = usePostSellerActivate();

  const onSubmit = (data: OpenStoreTypes) => {
    activateSeller(
      {
        name: data.name,
        slug: data.slug,
        address: data.address,
        logo: data.logo,
      },
      {
        onSuccess: () => {
          reset();
          router.push("/");
        },
      }
    );
  };

  // ✅ Extract readable message
  const errorMessage = (error as AxiosError<ApiError>)?.response?.data?.message;

  return {
    register,
    handleSubmit,
    errors,
    reset,
    onSubmit,
    isPending,
    isError,
    errorMessage, // ✅ clean and safe to render
  };
};

export default useOpenStoreForm;
