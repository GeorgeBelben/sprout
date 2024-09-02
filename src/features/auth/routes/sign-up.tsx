import { ReactElement, useMemo, useState } from "react";
import { Button, Input, Logo } from "~/components";
import { useFormik } from "formik";
import { auth } from "~/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export function SignUpRoute(): ReactElement {
	const { t } = useTranslation();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const form = useFormik({
		initialValues: {
			name: "",
			email: "",
			password: "",
			passwordConfirmation: "",
		},
		onSubmit: async (values) => {
			try {
				await createUserWithEmailAndPassword(auth, values.email, values.password).then(
					async (userCredential) => {
						await updateProfile(userCredential.user, {
							displayName: values.name,
						});
					}
				);
			} catch (error) {
				const firebaseError = error as FirebaseError;
				setErrorMessage(t(`firebaseErrors.${firebaseError.code}`));
			}
		},
	});

	const isSubmitDisabled = useMemo(() => {
		return !form.values.email || !form.values.password || form.values.password !== form.values.passwordConfirmation;
	}, [form.values]);

	return (
		<div className="bg-gray-1 h-[100dvh] flex items-center justify-center flex-col space-y-8">
			<Logo />
			{errorMessage && <p className="text-gray-12">{errorMessage}</p>}
			<form className="flex flex-col mt-8 space-y-4" onSubmit={form.handleSubmit} onBlur={form.handleBlur}>
				<Input placeholder={t("auth.forms.namePlaceholder")} type="text" {...form.getFieldProps("name")} />
				<Input placeholder={t("auth.forms.emailPlaceholder")} type="email" {...form.getFieldProps("email")} />
				<Input
					placeholder={t("auth.forms.passwordPlaceholder")}
					type="password"
					{...form.getFieldProps("password")}
				/>
				<Input
					placeholder={t("auth.forms.passwordConfirmationPlaceholder")}
					type="password"
					{...form.getFieldProps("passwordConfirmation")}
				/>
				<Button type="submit" disabled={isSubmitDisabled}>
					{t("auth.signUp")}
				</Button>
			</form>
			<Link className="text-violet-10" to="/sign-in">
				{t("auth.linkToSignIn")}
			</Link>
		</div>
	);
}
