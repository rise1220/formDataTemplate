package egovframework.example.cmmn;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class AspectLogger {
	private static final Logger logger = LoggerFactory.getLogger(AspectLogger.class);

	public void afterThrowingAdvice(JoinPoint joinPoint, Throwable exception) {
		String signatureInfo = getSignatureInfo(joinPoint);
		String exceptionMessage = exception.getMessage();
		if (exceptionMessage == null || exceptionMessage.trim().length() < 1) {
			exceptionMessage = "oops! occured exception";
		}
		logger.debug("=>> ### " + signatureInfo + " : " + exceptionMessage,
				exception);
		logger.warn("<<= ### " + signatureInfo + " : " + exceptionMessage);
	}

	public Object aroundAdvice(ProceedingJoinPoint joinPoint) throws Throwable {
		String signatureInfo = getSignatureInfo(joinPoint);
		logger.debug("=>> Start: " + signatureInfo);
		Object retVal = joinPoint.proceed();
		logger.debug("<<= End: " + signatureInfo
				+ (retVal != null ? " : " + retVal : ""));
		return retVal;
	}

	private String getSignatureInfo(JoinPoint joinPoint) {
		String signatureName = joinPoint.getSignature().getName();
		String className = joinPoint.getTarget().getClass().getSimpleName();
		StringBuilder sb = new StringBuilder();
		sb.append(className).append('.').append(signatureName);
		
		/*sb.append(className).append('.').append(signatureName).append('(');
		Object[] args = joinPoint.getArgs();
		if (args != null && args.length > 0) {
			for (int i = 0; i < args.length; i++) {
				if (args[i] instanceof String)
					sb.append('\"');
				sb.append(args[i]);
				if (args[i] instanceof String)
					sb.append('\"');
				if (i < args.length - 1) {
					sb.append(',');
				}
			}
		}
		sb.append(')');*/
		return sb.toString();
	}
}
